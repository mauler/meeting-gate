from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

from meeting.common.models import RawUUIDModel, BaseModel


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
    wristband_code = models.CharField(
        blank=True,
        db_index=True,
        null=True,
        max_length=10,
        unique=True,
        verbose_name=_('Pulseira'),
    )

    entry_on = models.DateTimeField(blank=True,
                                    null=True,
                                    verbose_name=_('Entrou em'))

    wallet_id = models.PositiveIntegerField(
        blank=True,
        null=True,
        verbose_name=_('ID Carteira')
    )

    shop_created_on = models.DateTimeField(verbose_name=_('Comprado em'),
                                           blank=True,
                                           null=True)

    class Meta:
        verbose_name = _('Pulseira')
        verbose_name_plural = _('Pulseiras')
        ordering = ('-entry_on', 'shop_created_on', )

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
    qrcode_requires_identification = models.BooleanField(default=False)


class PaperTicket(QRCode):
    batch_name = models.CharField(
        max_length=100,
        verbose_name=_('Nome do Lote'),
    )

    batch_line = models.PositiveIntegerField(
        verbose_name=_('Linha do Lote'),
    )

    class Meta:
        verbose_name = 'Ticket de Papel'
        verbose_name_plural = 'Tickets de Papel'
        ordering = ('-entry_on', 'shop_created_on', )


class WebTicket(QRCode, PersonModel):
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
        ordering = ('-entry_on', 'shop_created_on', )


class GuestTicket(QRCode, PersonModel):
    list_name = models.CharField(
        max_length=100,
        verbose_name=_('Nome da Lista de Convidados'),
    )

    class Meta:
        verbose_name = _('Ticket de Convidado')
        verbose_name_plural = _('Tickets de Convidados')
        ordering = ('-entry_on', 'list_name', )
