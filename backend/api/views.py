from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
from rest_framework import generics, viewsets
from api.models import *
from .serializers import *
# Create your views here.

class Player(generics.ListCreateAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    pass

class L30(generics.ListCreateAPIView):
    queryset = L30.objects.all()
    serializer_class = L30Serializer
    pass

class L7(generics.ListCreateAPIView):
    queryset = L7.objects.all()
    serializer_class = L7Serializer
    pass

class Season(generics.ListCreateAPIView):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    pass

class zSeason(generics.ListCreateAPIView):
    queryset = zSeason.objects.all()
    serializer_class = zSeasonSerializer
    pass

class zL7(generics.ListCreateAPIView):
    queryset = zL7.objects.all()
    serializer_class = zL7Serializer
    pass

class zL30(generics.ListCreateAPIView):
    queryset = zL30.objects.all()
    serializer_class = zL30Serializer
    pass

# class Assets(View):

#     def get(self, _request, filename):
#         path = os.path.join(os.path.dirname(__file__), 'static', filename)

#         if os.path.isfile(path):
#             with open(path, 'rb') as file:
#                 return HttpResponse(file.read(), content_type='application/javascript')
#         else:
#             return HttpResponseNotFound()