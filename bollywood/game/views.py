from django.shortcuts import render
from django.http import HttpResponse
from random import randint
from game.models import Question


def index(request):
    keyboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r",
                "s", "t", "v", "w", "x", "y", "z"]
    count = Question.objects.count()
    random_movie = Question.objects.all()[randint(0, count - 1)]
    context = {
        'keyboard': keyboard,
        'random_movie': random_movie,
    }
    return render(request, 'game/index.html', context)
