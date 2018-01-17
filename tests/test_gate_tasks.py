from unittest.mock import Mock

from django.utils import timezone
import pytest

from meeting.gate.models import WebTicket
from meeting.gate.tasks import sync_wristband_wallet


@pytest.fixture
def webticket():
    return WebTicket.objects.create(wristband_code='1234567890',
                                    person_name='Person',
                                    person_document='DocumentId')


@pytest.mark.django_db
def test_sync_wristband_wallet_error(webticket, mocker):
    WALLET_ID = 123
    WALLET_INFO = 'Person (DocumentId)'
    WALLET_DATA = {'wallet_id': WALLET_ID, 'wallet_info': WALLET_INFO}

    mocker.patch('requests.put',
                 return_value=Mock(status_code=404,
                                   json=Mock(return_value=WALLET_DATA)))

    assert sync_wristband_wallet(webticket.wristband_code,
                                 timezone.now(),
                                 webticket) is None


@pytest.mark.django_db
def test_sync_wristband_wallet_success(webticket, mocker):
    WALLET_ID = 123
    WALLET_INFO = 'Person (DocumentId)'
    WALLET_DATA = {'wallet_id': WALLET_ID, 'wallet_info': WALLET_INFO}

    mocker.patch('requests.put',
                 return_value=Mock(status_code=200,
                                   json=Mock(return_value=WALLET_DATA)))

    assert sync_wristband_wallet(webticket.wristband_code,
                                 timezone.now(),
                                 webticket) == WALLET_DATA
