from django.contrib import admin
from .models import Product, Order, OrderItem

# This makes your tables visible in the admin dashboard
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)