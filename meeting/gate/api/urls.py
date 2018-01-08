from django.conf.urls import url

from meeting.gate.api import views


app_name = 'meeting.gate.api'


urlpatterns = [
    url(r'^entry/(?P<uuid>[\W\w-]+)/$',
        views.AccessUpdate.as_view(),
        name='access_update'),

    url(r'^qrcode/(?P<uuid>[\W\w-]+)/$',
        views.QRCodeDetail.as_view(),
        name='qrcode_detail'),

    url(r'^wristband/(?P<wristband_code>[\W\w-]+)/$',
        views.WristbandDetail.as_view(),
        name='wristband_detail'),
]
