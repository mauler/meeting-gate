from django.conf import settings

from rest_framework import status
import requests


def sync_wristband_wallet(wristband_code, entry_on, ticket, qrcode=None):
    url = settings.FESTIVAL_API_URL + '/wallets/{}'.format(wristband_code)
    sync = {
        'gate_qrcode': qrcode,
        'gate_entry_on': entry_on,
        'gate_ticket': ticket,
    }
    r = requests.put(url, sync)

    print(url, r.status_code, sync)
    print(r.json())
    if r.status_code != status.HTTP_200_OK:
        return None

    return r.json()
