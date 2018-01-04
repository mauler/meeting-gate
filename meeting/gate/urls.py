from django.conf.urls import url

from meeting.gate.views import index, debug_qrcode_input_reader, sell


app_name = 'meeting.gate'


urlpatterns = [
    url(r'^debug/qrcode/input/$',
        debug_qrcode_input_reader,
        name='debug_qrcode_input_reader'),

    url(r'^sell/$', sell, name='sell'),

    url(r'^$', index, name='index'),
]
