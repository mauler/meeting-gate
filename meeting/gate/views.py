from django.shortcuts import render

from meeting.gate.forms import SellForm


def debug_qrcode_input_reader(request):
    return render(request, 'meeeing/gate/debug_qrcode_input_reader.html')


def index(request):
    return render(request, 'meeting/gate/index.html')


def sell(request):
    form = SellForm(request.POST or None)
    if form.is_valid():
        form.save()

    return render(request, 'meeting/gate/sell.html', {'form': form})
