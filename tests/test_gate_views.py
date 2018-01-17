from django.test import TestCase
from django.urls import reverse


class ViewsTestCase(TestCase):
    WRISTBAND_CODE = '1234567890'

    def test_sell(self):
        url = reverse('meeting-gate:sell')

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        response = self.client.post(url,
                                    {'wristband_code': self.WRISTBAND_CODE})
        self.assertEqual(response.status_code, 200)
        self.assertNotIn(b'WBAND_CODE_EXISTS', response.content)

        response = self.client.post(url,
                                    {'wristband_code': self.WRISTBAND_CODE})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'WBAND_CODE_EXISTS', response.content)

    def test_index(self):
        response = self.client.get(reverse('meeting-gate:index'))
        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.status_code, 200)

    def test_debug_qrcode_input_reader(self):
        response = \
            self.client.get(reverse('meeting-gate:debug_qrcode_input_reader'))
        self.assertEqual(response.status_code, 200)
