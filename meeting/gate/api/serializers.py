from rest_framework import serializers

from meeting.gate import models


class GuestTicketSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('list_name', 'person_name', 'person_document', )
        model = models.GuestTicket


class WebTicketSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('product_id', 'product_name', 'buyer_name', 'buyer_email', )
        model = models.WebTicket


class PaperTicketSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('batch_name', 'batch_line', )
        model = models.PaperTicket


class TicketSerializer(serializers.ModelSerializer):
    web_ticket = serializers.SerializerMethodField()
    paper_ticket = serializers.SerializerMethodField()
    guest_ticket = serializers.SerializerMethodField()

    class Meta:
        fields = ['shop_purchase_date',
                  'web_ticket',
                  'paper_ticket',
                  'guest_ticket',
                  'wristband_code',
                  'entry_on',
                  'wallet_id',
                  'wallet_info']
        model = models.QRCode

    def get_web_ticket(self, qrcode):
        if models.WebTicket.objects.filter(id=qrcode.id).exists():
            return WebTicketSerializer(qrcode.webticket).data

    def get_paper_ticket(self, qrcode):
        if models.PaperTicket.objects.filter(id=qrcode.id).exists():
            return PaperTicketSerializer(qrcode.paperticket).data

    def get_guest_ticket(self, qrcode):
        if models.GuestTicket.objects.filter(id=qrcode.id).exists():
            return GuestTicketSerializer(qrcode.guestticket).data


class QRCodeSerializer(TicketSerializer):
    class Meta:
        model = models.QRCode
        fields = fields = ['uuid', 'qrcode_requires_identification'] + \
            TicketSerializer.Meta.fields


class WristbandSerializer(serializers.ModelSerializer):
    ticket = serializers.SerializerMethodField()

    class Meta:
        model = models.Wristband
        fields = ['wristband_code', 'entry_on', 'ticket']

    def get_ticket(self, wband):
        try:
            if wband.entry_on:
                return TicketSerializer(wband.qrcode).data
        except models.QRCode.DoesNotExist:
            return None


class UpdateAccessSerializer(serializers.ModelSerializer):
    wristband_code = serializers.CharField(max_length=100)

    class Meta:
        model = models.QRCode
        fields = ('wristband_code', )
