from unicodedata import name
from django.core.management.base import BaseCommand, CommandError
from django.db import models
from decimal import Decimal
from bs4 import BeautifulSoup
import requests
from api.models import Season, L30, L7, zSeason, zL30, zL7, Player
# Create your models here.


class Command(BaseCommand):
    def handle(self, *args, **options):
        print(Season.objects.all().filter(age__gt=20))
