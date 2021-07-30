from .serializers import ItemSerializer, ItemDetailSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from catalog.models import Item


class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class  = ItemSerializer
    queryset = Item.objects.all()

class ItemDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class  = ItemDetailSerializer
    queryset = Item.objects.all()