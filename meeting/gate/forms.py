from django import forms

from meeting.gate.models import LocalTicket


class SellForm(forms.ModelForm):
    wristband_code = forms.CharField(label='Pulseira',
                                     required=True,
                                     min_length=10, max_length=10,
                                     widget=forms.TextInput(
                                        attrs={'autoFocus': 'true'}))

    class Meta:
        fields = ('wristband_code', )
        model = LocalTicket
