from .serializers import ItemSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from catalog.models import Item


class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class  = ItemSerializer
    queryset = Item.objects.all()