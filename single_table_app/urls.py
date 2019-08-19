from django.urls import path 
from single_table_app import views

urlpatterns = [
    path('', views.index, name='index'),
]