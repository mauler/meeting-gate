from django.conf.urls import url, include


urlpatterns = [
    url(r'', include('meeting.gate.urls', namespace='meeting-gate')),
]
