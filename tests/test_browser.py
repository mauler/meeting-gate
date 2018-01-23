from time import sleep

from selenium.webdriver.common.keys import Keys
import pytest

from meeting.gate.models import WebTicket, GuestTicket


@pytest.fixture(scope='session')
def splinter_webdriver():
    """Override splinter webdriver name."""
    return 'firefox'


@pytest.fixture
def admin_browser(request, browser_instance_getter):
    """Admin browser fixture."""
    # browser_instance_getter function receives parent fixture -- our
    # admin_browser
    return browser_instance_getter(request, admin_browser)


@pytest.fixture
def gate_browser(admin_browser, live_server):
    admin_browser.visit(live_server.url)
    return admin_browser


class Helpers:
    def __init__(self, browser):
        self.browser = browser

    def check_message(self, message_code):
        return self.browser.is_text_present(message_code)

    def fill_input(self, input_name, value):
        self.browser.fill(input_name, value)
        el = self.browser.driver.switch_to_active_element()
        el.send_keys(Keys.ENTER)


@pytest.fixture
def helpers(gate_browser):
    return Helpers(gate_browser)


def test_qrcode_not_found(gate_browser, helpers):
    helpers.fill_input('qrcode', 'SOME_QR_CODE')

    assert helpers.check_message('QRCODE_NOT_FOUND')


def test_qrcode_valid(gate_browser, helpers):
    WebTicket.objects.create(uuid='SOME_QR_CODE')

    helpers.fill_input('qrcode', 'SOME_QR_CODE')

    assert helpers.check_message('QRCODE_VALID')


def test_qrcode_already_used(gate_browser, helpers):
    tkt = WebTicket.objects.create(uuid='SOME_QR_CODE')
    tkt.wristband_code = 'SOME_WRISTBAND'
    tkt.save()

    helpers.fill_input('qrcode', 'SOME_QR_CODE')

    assert helpers.check_message('QRCODE_ALREADY_USED')


def test_wristband_already_used(gate_browser, helpers):
    WebTicket.objects.create(uuid='USED_QRCODE',
                             wristband_code='USED_WRISTBAND')

    WebTicket.objects.create(uuid='AVAILABLE_QRCODE')

    helpers.fill_input('qrcode', 'AVAILABLE_QRCODE')

    helpers.fill_input('wristband', 'USED_WRISTBAND')

    assert helpers.check_message('WRISTBAND_ALREADY_USED')


def test_qrcode_requires_identification(gate_browser, helpers):
    GuestTicket.objects.create(uuid='AVAILABLE_QRCODE',
                               person_name='PERSON_NAME',
                               person_document='PERSON_DOCUMENT',
                               qrcode_requires_identification=True)

    helpers.fill_input('qrcode', 'AVAILABLE_QRCODE')


def test_success_entry(gate_browser, helpers):
    WebTicket.objects.create(uuid='AVAILABLE_QRCODE')

    helpers.fill_input('qrcode', 'AVAILABLE_QRCODE')

    helpers.fill_input('wristband', 'AVAILABLE_WRISTBAND')

    sleep(1)

    prompt = gate_browser.driver.switch_to_alert()

    assert 'ENTER' in prompt.text

    prompt.accept()

    sleep(1)

    alert = gate_browser.driver.switch_to_alert()

    assert 'CONFIRMADA' in alert.text
