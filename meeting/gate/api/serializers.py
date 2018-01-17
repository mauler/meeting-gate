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


class QRCodeSerializer(serializers.ModelSerializer):
    web_ticket = serializers.SerializerMethodField()
    paper_ticket = serializers.SerializerMethodField()
    guest_ticket = serializers.SerializerMethodField()

    class Meta:
        fields = ('uuid',
                  'web_ticket',
                  'paper_ticket',
                  'guest_ticket',
                  'wristband_code',
                  'entry_on',
                  'wallet_id',
                  'shop_created_on',
                  'qrcode_requires_identification', )
        model = models.QRCode

    def get_web_ticket(self, qrcode):
        if models.WebTicket.objects.filter(uuid=qrcode.uuid).exists():
            return WebTicketSerializer(qrcode.webticket).data

    def get_paper_ticket(self, qrcode):
        if models.PaperTicket.objects.filter(uuid=qrcode.uuid).exists():
            return PaperTicketSerializer(qrcode.paperticket).data

    def get_guest_ticket(self, qrcode):
        if models.GuestTicket.objects.filter(uuid=qrcode.uuid).exists():
            return GuestTicketSerializer(qrcode.guestticket).data


class WristbandSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Wristband
        fields = ('wristband_code', 'entry_on', 'wallet_id', 'shop_created_on')


class UpdateAccessSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.QRCode
        fields = ('wristband_code', )
