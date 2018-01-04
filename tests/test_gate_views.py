from django.test import TestCase
from django.urls import reverse


class ViewsTestCase(TestCase):

    def test_sell(self):
        response = self.client.get(reverse('meeting-gate:sell'))
        self.assertEqual(response.status_code, 200)
