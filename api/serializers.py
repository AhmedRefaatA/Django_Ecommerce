from rest_framework import serializers
from catalog.models import *



class ItemSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField('get_category')
    label = serializers.SerializerMethodField('get_label')
    class Meta:
        model = Item
        fields  = "__all__"
    def get_category(self, obj):
        return obj.get_category_display()

    def get_label(self, obj):
        return obj.get_label_display()