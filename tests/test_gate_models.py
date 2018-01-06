from django.test import TestCase

from meeting.gate.models import Wristband, LocalTicket


class ModelsTestCase(TestCase):

    def test_wristband_entry_on(self):
        """ Wristband entry_on attribute only be filled when wristband_code is
        set. """
        wband = Wristband()
        wband.save()
        self.assertIsNone(wband.entry_on)

        wband = Wristband(wristband_code='code')
        wband.save()
        self.assertIsNotNone(wband.entry_on)

    def test_localticket_entry_on(self):
        """ LocalTicket entry_on attribute should always be set, since it's
        created if a ticket is bought on meeting entrance. """
        tkt = LocalTicket()
        tkt.save()
        self.assertIsNotNone(tkt.entry_on)
