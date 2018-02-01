from django.db.models import signals
from django.db import models
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

from meeting.common.models import RawUUIDModel, BaseModel, NamedBaseModel


class PersonModel(models.Model):
    person_name = models.CharField(
        blank=True,
        max_length=100,
        verbose_name=_('Nome da Pessoa')
    )

    person_document = models.CharField(
        blank=True,
        max_length=14,
        verbose_name=_('Documento da Pessoa')
    )

    class Meta:
        abstract = True


class Wristband(BaseModel):
    # WBAND_CREATED = 'Pulseira registrada com sucesso.'
    WBAND_CODE_EXISTS = ('WBAND_CODE_EXISTS: Esta pulseira já foi registrada '
                         'em nosso sistema.')

    wristband_code = models.CharField(
        blank=True,
        db_index=True,
        null=True,
        max_length=100,
        unique=True,
        verbose_name=_('Pulseira'),
        error_messages={'unique': WBAND_CODE_EXISTS}
    )

    entry_on = models.DateTimeField(blank=True,
                                    null=True,
                                    verbose_name=_('Entrou em'))

    wallet_id = models.PositiveIntegerField(
        blank=True,
        null=True,
        verbose_name=_('ID Carteira')
    )

    wallet_info = models.TextField(blank=True)

    # TODO: Move this to QRCode?
    shop_purchase_date = models.DateTimeField(verbose_name=_('Comprado em'),
                                              blank=True,
                                              null=True)

    class Meta:
        verbose_name = _('Pulseira')
        verbose_name_plural = _('Pulseiras')
        ordering = ('-entry_on', 'shop_purchase_date', )

    def save(self, *args, **kwargs):
        if self.entry_on is None and self.wristband_code:
            self.entry_on = timezone.now()

        return super().save(*args, **kwargs)


class LocalTicket(Wristband):

    class Meta:
        verbose_name = _('Ticket Local')
        verbose_name_plural = _('Tickets Locais')
        ordering = ('-entry_on', )

    def save(self, *args, **kwargs):
        if self.entry_on is None:
            self.entry_on = timezone.now()

        return super().save(*args, **kwargs)


class QRCode(Wristband, RawUUIDModel):
    qrcode_requires_identification = models.BooleanField(
        default=False,
        verbose_name='qrcode_requires_identification verbose_name',
        help_text='qrcode_requires_identification')


class BatchPaperTicket(NamedBaseModel):
    first_line = models.PositiveIntegerField(default=1)
    contents = models.TextField()


class PaperTicket(QRCode):
    batch = models.ForeignKey('BatchPaperTicket',
                              blank=True,
                              null=True,
                              on_delete=models.SET_NULL)

    batch_name = models.CharField(
        max_length=100,
        verbose_name=_('Nome do Lote'),
    )

    batch_line = models.PositiveIntegerField(
        verbose_name=_('Linha do Lote'),
    )

    class Meta:
        ordering = ('-entry_on', 'shop_purchase_date', )
        unique_together = ('batch', 'batch_line', )
        verbose_name = 'Ticket de Papel'
        verbose_name_plural = 'Tickets de Papel'


@receiver(signals.post_save, sender=BatchPaperTicket)
def create_paper_tickets(sender, instance, created, *args, **kwargs):
    if created:
        for line, uuid in enumerate(instance.contents.strip().split('\n'),
                                    start=instance.first_line):
            uuid = uuid.strip()
            if uuid:
                defaults = {
                    'batch': instance,
                    'batch_name': instance.name,
                    'batch_line': line,
                }
                PaperTicket.objects.get_or_create(uuid=uuid,
                                                  defaults=defaults)


class WebTicket(QRCode, PersonModel):
    """WebTicket data handles web tickets information.

    Web tickets contains a QRCode (`uuid param`) usually previously
    generated from another application.

    The required attributes are:

    :param uuid: The universally unique identifier for the ticket.
    :type uuid: string
    :param product_id: The product ID or type.
    :type product_id: integer
    :param product_name: The product name or description.
    :type product_name: string
    :param buyer_name: The product buyer name.
    :type buyer_name: string
    :param buyer_email: The product buyer email.
    :type buyer_email: string
    :param shop_purchase_date: The shop purchase date.
    :type shop_purchase_date: datetime

    So, you need the create the web ticket containing the attributes above.

    :Example:

    >>> WebTicket.objects.create(uuid='SOME-UUID',
    ...                          product_id=123,
    ...                          product_name='Festival Ticket',
    ...                          buyer_name='Regular Joe',
    ...                          buyer_email='buyer@email.com',
    ...                          shop_purchase_date=datetime(2012, 12, 12, 12))
    <WebTicket: SOME-UUID>

    .. note::

        The complete attribute list below is autogenerated, most of the fields
        are **not necessary** to create a **valid WebTicket**.

    """
    product_id = models.PositiveIntegerField(
        blank=True,
        null=True,
        verbose_name=_('ID do Produto'),
    )

    product_name = models.CharField(
        max_length=100,
        verbose_name=_('Nome do Produto'),
    )

    buyer_name = models.CharField(
        max_length=100,
        verbose_name=_('Nome do Comprador'),
    )

    buyer_email = models.EmailField(
        verbose_name=_('Email do Comprador'),
    )

    class Meta:
        verbose_name = _('Ticket Web')
        verbose_name_plural = _('Tickets Web')
        ordering = ('-entry_on', 'shop_purchase_date', )


class GuestTicket(QRCode, PersonModel):
    """GuestTicket data handles guest tickets information.

    Guest tickets contains a QRCode (`uuid param`) usually previously
    generated from another application and also the guest name and document
    required to allow the guest entrance.

    The required attributes are:

    :param uuid: The universally unique identifier for the ticket.
    :type uuid: string
    :param list_name: The list this guest is related, for example: Sound Crew.
    :type list_name: string
    :param person_name: The guest name to be checked on ther person document.
    :type person_name: string
    :param person_document: The guest document id code.
    :type person_document: integer

    So, you need the create the guest ticket containing the attributes above.

    :Example:

    >>> GuestTicket.objects.create(uuid='SOME-UUID',
    ...                            list_name='Sound Crew',
    ...                            person_name='Regular Joe',
    ...                            person_document='ABC-123')
    <GuestTicket: SOME-UUID>

    .. note::

        The complete attribute list below is autogenerated, most of the fields
        are **not necessary** to create a **valid GuestTicket**.

    """
    list_name = models.CharField(
        max_length=100,
        verbose_name=_('Nome da Lista de Convidados'),
    )

    class Meta:
        verbose_name = _('Ticket de Convidado')
        verbose_name_plural = _('Tickets de Convidados')
        ordering = ('-entry_on', 'list_name', )
