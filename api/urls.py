from django.urls import path
from .views import ItemListView


urlpatterns = [
    path('product', ItemListView.as_view(), name='product')
]