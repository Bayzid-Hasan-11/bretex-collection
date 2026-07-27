from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products, name='get_products'),
    path('products/<slug:slug>/', views.get_product, name='get_product'), # <-- NEW
    path('orders/', views.create_order, name='create_order'),
]