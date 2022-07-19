from sre_parse import State
from rest_framework import serializers
from api.models import L30, L7, Season, zSeason, zL30, zL7, Player
class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ("__all__")
        pass

class L30Serializer(serializers.ModelSerializer):
    class Meta:
        model = L30
        fields = ("__all__")
        pass

class L7Serializer(serializers.ModelSerializer):
    class Meta:
        model = L7
        fields = ("__all__")
        pass

class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = ("__all__")
        pass

class zSeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = zSeason
        fields = ("__all__")
        pass

class zL30Serializer(serializers.ModelSerializer):
    class Meta:
        model = zL30
        fields = ("__all__")
        pass

class zL7Serializer(serializers.ModelSerializer):
    class Meta:
        model = zL7
        fields = ("__all__")
        pass