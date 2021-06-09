from rest_framework import serializers
from catalog.models import *



class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields  = "__all__"