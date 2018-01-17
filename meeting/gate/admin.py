from django.contrib import admin

from meeting.gate.models import Wristband, GuestTicket, WebTicket, \
    LocalTicket, PaperTicket
from meeting.utils.isnull_filter import isnull_filter


admin.site.site_header = 'Meeting GATE Application'
admin.site.site_title = 'meeting-gate :: admin'


@admin.register(PaperTicket)
class PaperTicketAdmin(admin.ModelAdmin):
    date_hierarchy = 'entry_on'
    list_display = ('batch_name', 'batch_line',
                    'uuid',
                    'wristband_code',
                    'entry_on',
                    'shop_created_on',
                    'wallet_id', )
    list_filter = (
        'entry_on',
        isnull_filter('wallet_id'),
        'shop_created_on',
    )
    search_fields = ('=wristband_code', '=uuid', )


@admin.register(Wristband)
class WristbandAdmin(admin.ModelAdmin):
    date_hierarchy = 'entry_on'
    list_display = ('wristband_code', 'entry_on', 'wallet_id',
                    'shop_created_on', )
    list_filter = (
        isnull_filter('wallet_id'),
        'shop_created_on',
        'entry_on',
    )
    search_fields = ('=wristband_code', )


@admin.register(LocalTicket)
class LocalTicketAdmin(admin.ModelAdmin):
    date_hierarchy = 'entry_on'
    list_display = ('wristband_code',
                    'entry_on',
                    'wallet_id',
                    'wallet_info',
                    'shop_created_on', )
    list_filter = (
        isnull_filter('wallet_id'),
        'entry_on',
        'shop_created_on',
    )
    search_fields = ('=wristband_code', 'wallet_info', )


@admin.register(GuestTicket)
class GuestTicketAdmin(admin.ModelAdmin):
    date_hierarchy = 'entry_on'
    list_display = ('person_name', 'person_document', 'list_name', 'uuid',
                    'wristband_code',
                    'entry_on', 'wallet_id', )
    list_filter = ('entry_on', 'list_name', 'shop_created_on', )
    search_fields = ('=wristband_code', 'name', 'document', )


@admin.register(WebTicket)
class WebTicketAdmin(admin.ModelAdmin):
    date_hierarchy = 'shop_created_on'
    list_display = ('buyer_name', 'buyer_email', 'uuid',
                    'wristband_code',
                    'entry_on', 'wallet_id', 'product_name', )
    list_filter = (
        'entry_on',
        isnull_filter('wallet_id'),
        'shop_created_on',
        'product_name',
        'product_id',
    )
    search_fields = ('=wristband_code', '=uuid', 'buyer_name',
                     'buyer_email', )
