import datetime

from django.db import models
from django.utils import timezone


class Question(models.Model):
    question_text = models.CharField('Question text', max_length=200)

    def __str__(self):
        return self.question_text
