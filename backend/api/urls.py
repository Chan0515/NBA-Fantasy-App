from django.urls import path
from .views import *

app_name = 'api'

urlpatterns = [
    path('Player/', Player.as_view(), name = 'listcreate'),
    path('L30/', L30.as_view(), name = 'listcreate'),
    path('Season/', Season.as_view(), name = 'listcreate'),
    path('L7/', L7.as_view(), name = 'listcreate'),
    path('zSeason/', zSeason.as_view(), name = 'listcreate'),
    path('zL7/', zL7.as_view(), name = 'listcreate'),
    path('zL30/', zL30.as_view(), name = 'listcreate')
]