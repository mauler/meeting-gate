from django.urls import reverse

from rest_framework.test import APITestCase
from rest_framework import status

from meeting.gate.models import WebTicket, PaperTicket, GuestTicket, \
    Wristband


class WristbandApiTest(APITestCase):
    WRISTBAND_CODE = 'abc123'

    def setUp(self):
        super().setUp()
        self.wband = \
            Wristband.objects.create(wristband_code=self.WRISTBAND_CODE)

    def test_wristband_detail(self):
        url = reverse('meeting-gate:api:wristband_detail',
                      args=(self.WRISTBAND_CODE, ))
        r = self.client.get(url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)


class QRCodeApiTest(APITestCase):
    PRODUCT_ID = 666
    PRODUCT_NAME = 'hell-ticket'

    BUYER_NAME = 'Paulo R'
    BUYER_EMAIL = 'paulo@maniacsmm.com'

    BATCH_NAME = 'first-batch'
    BATCH_LINE = 1

    GUEST_LIST_NAME = 'band-members'
    GUEST_NAME = 'guitarrist'
    GUEST_DOCUMENT = '666'

    WRISTBAND_CODE = 'abc123'

    def setUp(self):
        super().setUp()

        self.guesttkt = GuestTicket.objects.create(
            list_name=self.GUEST_LIST_NAME,
            person_name=self.GUEST_NAME,
            person_document=self.GUEST_DOCUMENT)

        self.papertkt = PaperTicket.objects.create(batch_name=self.BATCH_NAME,
                                                   batch_line=self.BATCH_LINE)

        self.webtkt = WebTicket.objects.create(
            product_id=self.PRODUCT_ID,
            product_name=self.PRODUCT_NAME,
            buyer_name=self.BUYER_NAME,
            buyer_email=self.BUYER_EMAIL)

    def test_access_update(self):
        url = reverse('meeting-gate:api:access_update',
                      args=(self.webtkt.uuid, ))
        r = self.client.put(url, {'wristband_code': self.WRISTBAND_CODE})
        self.assertEqual(r.status_code, status.HTTP_200_OK)

    def test_api_qrcode_detail_404(self):
        url = reverse('meeting-gate:api:qrcode_detail', args=('123456', ))
        r = self.client.get(url)
        self.assertEqual(r.status_code, status.HTTP_404_NOT_FOUND)

    def test_api_web_ticket_detail(self):
        url = reverse('meeting-gate:api:qrcode_detail',
                      args=(self.webtkt.uuid, ))
        r = self.client.get(url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(r.data['web_ticket'],
                         {'product_name': self.PRODUCT_NAME,
                          'product_id': self.PRODUCT_ID,
                          'buyer_email': self.BUYER_EMAIL,
                          'buyer_name': self.BUYER_NAME})

    def test_api_paper_ticket_detail(self):
        url = reverse('meeting-gate:api:qrcode_detail',
                      args=(self.papertkt.uuid, ))
        r = self.client.get(url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(r.data['paper_ticket'],
                         {'batch_name': self.BATCH_NAME,
                          'batch_line': self.BATCH_LINE})

    def test_api_guest_ticket_detail(self):
        url = reverse('meeting-gate:api:qrcode_detail',
                      args=(self.guesttkt.uuid, ))
        r = self.client.get(url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(r.data['guest_ticket'],
                         {'list_name': self.GUEST_LIST_NAME,
                          'person_name': self.GUEST_NAME,
                          'person_document': self.GUEST_DOCUMENT})
