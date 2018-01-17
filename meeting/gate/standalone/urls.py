from django.conf.urls.static import static
from django.conf.urls import url, include
from django.conf import settings
from django.contrib import admin


urlpatterns = [] + \
    static(settings.STATIC_URL,
           document_root=settings.STATIC_ROOT) + \
    [
        url(r'^Meeting-Gate-Admin/', admin.site.urls),
        url(r'', include('meeting.gate.urls', namespace='meeting-gate')),
    ]
