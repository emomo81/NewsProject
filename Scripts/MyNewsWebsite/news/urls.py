from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.get_news, name='get_news'),
    path('latest/', views.get_latest, name='get_latest'),
]
