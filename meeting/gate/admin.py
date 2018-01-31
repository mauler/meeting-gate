from django.contrib import admin

from meeting.gate.models import Wristband, GuestTicket, WebTicket, \
    LocalTicket, PaperTicket, BatchPaperTicket
from meeting.utils.isnull_filter import isnull_filter


admin.site.site_header = 'Meeting GATE Application'
admin.site.site_title = 'meeting-gate :: admin'


@admin.register(BatchPaperTicket)
class BatchPaperTicketAdmin(admin.ModelAdmin):
    list_display = ('name', 'first_line', )


@admin.register(PaperTicket)
class PaperTicketAdmin(admin.ModelAdmin):
    date_hierarchy = 'entry_on'
    list_display = ('batch_name', 'batch_line',
                    'uuid',
                    'wristband_code',
                    'entry_on',
                    'shop_purchase_date',
                    'wallet_id', )
    list_filter = (
        'entry_on',
        isnull_filter('wallet_id'),
        'shop_purchase_date',
    )
    search_fields = ('=wristband_code', '=uuid', )


@admin.register(Wristband)
class WristbandAdmin(admin.ModelAdmin):
    date_hierarchy = 'entry_on'
    list_display = ('wristband_code', 'entry_on', 'wallet_id',
                    'shop_purchase_date', )
    list_filter = (
        isnull_filter('wallet_id'),
        'shop_purchase_date',
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
                    'shop_purchase_date', )
    list_filter = (
        isnull_filter('wallet_id'),
        'entry_on',
        'shop_purchase_date',
    )
    search_fields = ('=wristband_code', 'wallet_info', )


@admin.register(GuestTicket)
class GuestTicketAdmin(admin.ModelAdmin):
    date_hierarchy = 'entry_on'
    list_display = ('person_name', 'person_document', 'list_name', 'uuid',
                    'wristband_code',
                    'entry_on', 'wallet_id', 'wallet_info')
    list_filter = ('entry_on', 'list_name', 'shop_purchase_date', )
    search_fields = ('=wristband_code', 'name', 'document', )


@admin.register(WebTicket)
class WebTicketAdmin(admin.ModelAdmin):
    date_hierarchy = 'shop_purchase_date'
    list_display = ('buyer_name', 'buyer_email', 'uuid',
                    'wristband_code',
                    'entry_on', 'wallet_id', 'product_name', )
    list_filter = (
        'entry_on',
        isnull_filter('wallet_id'),
        'shop_purchase_date',
        'product_name',
        'product_id',
    )
    search_fields = ('=wristband_code', '=uuid', 'buyer_name',
                     'buyer_email', )
