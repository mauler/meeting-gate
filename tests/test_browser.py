from selenium.webdriver.common.keys import Keys
import pytest

"""
TODO

Erors:

- Wristband
    - wristband_code exists: error WBAND_CODE_EXISTS
    - entry_on is not None: error WBAND_ENTRY_IS_NOT_NONE

- LocalTicket
    - Form save

- QRCode
    qrcode_requires_identification == True: show QRCODE_REQUIRES_ID message
"""


# @pytest.fixture(scope='session')
# def splinter_webdriver():
#     """Override splinter webdriver name."""
#     return 'remote'


# @pytest.fixture(scope='session')
# def splinter_webdriver():
#     """Override splinter webdriver name."""
#     return 'remote'


@pytest.fixture
def admin_browser(request, browser_instance_getter):
    """Admin browser fixture."""
    # browser_instance_getter function receives parent fixture -- our
    # admin_browser
    return browser_instance_getter(request, admin_browser)


def test_2_browsers(browser, admin_browser, live_server):
    """Test using 2 browsers at the same time."""
    browser.visit(live_server.url)
    admin_browser.visit(live_server.url)
    assert browser.is_text_present('Pulseira')
    el = browser.driver.switch_to_active_element()
    el.send_keys('1234567890')
    el.send_keys(Keys.ENTER)
    import pdb
    pdb.set_trace()
    assert browser.is_text_present('Pulseira')
