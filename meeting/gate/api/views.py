from rest_framework import generics

from meeting.gate.api.serializers import QRCodeSerializer, WristbandSerializer, \
    UpdateAccessSerializer
from meeting.gate.models import QRCode, Wristband


class AccessUpdate(generics.UpdateAPIView):
    lookup_field = 'uuid'
    serializer_class = UpdateAccessSerializer

    def get_queryset(self):
        return QRCode.objects.filter(wristband_code__isnull=True)


class QRCodeDetail(generics.RetrieveAPIView):
    lookup_field = 'uuid'
    queryset = QRCode
    serializer_class = QRCodeSerializer


class WristbandDetail(QRCodeDetail):
    lookup_field = 'wristband_code'
    queryset = Wristband
    serializer_class = WristbandSerializer
