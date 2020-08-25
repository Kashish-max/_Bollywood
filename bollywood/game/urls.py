from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^regen_movie/$', views.regen_movie.as_view(), name='regen_movie'),
]
