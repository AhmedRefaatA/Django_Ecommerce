from django.urls import path
from .views import ItemListView, ItemDetailView


urlpatterns = [
    path('product', ItemListView.as_view(), name='product'),
    path('product/<pk>', ItemDetailView.as_view(), name='product_details')

]