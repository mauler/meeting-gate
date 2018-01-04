from django.utils import timezone
from django import forms

from meeting.gate.models import LocalTicket


class SellForm(forms.ModelForm):
    wristband_code = forms.CharField(label='Pulseira', required=True,
                                     min_length=10, max_length=10)

    class Meta:
        fields = ('wristband_code', )
        model = LocalTicket

    def save(self, commit=True, *ar, **kw):
        obj = super().save(commit=commit, *ar, **kw)
        if not obj.entry_on:
            obj.entry_on = timezone.now()
            obj.save(commit=commit, update_fields=['entry_on'])
        return obj
