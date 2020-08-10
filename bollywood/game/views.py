from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    upper_layer = ["q", "w", "e", "r", "t", "y", "u", "i",
               "o", "p"]
    middle_layer = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]
    bottom_layer = ["z", "x", "c", "v", "b", "n", "m"]
    context = {
        'upper_layer': upper_layer,
        'middle_layer': middle_layer,
        'bottom_layer': bottom_layer,
    }
    return render(request, 'game/index.html', context)
