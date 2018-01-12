import pytest


# @pytest.fixture(scope='session')
# def splinter_webdriver():
#     """Override splinter webdriver name."""
#     return 'phantomjs'


@pytest.fixture
def admin_browser(request, browser_instance_getter):
    """Admin browser fixture."""
    # browser_instance_getter function receives parent fixture -- our
    # admin_browser
    return browser_instance_getter(request, admin_browser)


def test_2_browsers(browser, admin_browser, live_server):
    """Test using 2 browsers at the same time."""
    browser.visit(live_server.url)
    # admin_browser.visit(live_server.url)
    assert browser.is_text_present('Venda')
