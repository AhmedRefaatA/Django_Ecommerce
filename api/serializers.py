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

class VariationSerializer(serializers.ModelSerializer):
    item_variations = serializers.SerializerMethodField('get_item_variation')
    class Meta:
        model = Variation
        fields = [
            'id',
            'name',
            'item_variations'
        ]
    def get_item_variation(self, obj):
        return ItemVariationSerializer(obj.itemvariation_set.all(), many=True).data

class ItemVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariation
        fields = [
            'id',
            'variation',
            'value',
            'attachment'
        ]
       
class ItemDetailSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField('get_category')
    label = serializers.SerializerMethodField('get_label')
    variations = serializers.SerializerMethodField('get_variations')
    class Meta:
        model = Item
        fields  = [
            'id',
            'title',
            'price',
            'discount_price',
            'slug',
            'status',
            'category',
            'label',
            'describtion',
            'image',
            'variations'
        ]
    def get_category(self, obj):
        return obj.get_category_display()

    def get_label(self, obj):
        return obj.get_label_display()

    def get_variations(self, obj):
        return VariationSerializer(obj.variation_set.all(), many=True).data