from rest_framework import serializers
from .models import Product, Order, OrderItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'color', 'size', 'price', 'stock', 'is_active', 'image_url', 'category']

# New: Translate Order Items
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']

# New: Translate the full Order
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True) # Tells Django an order has multiple items

    class Meta:
        model = Order
        fields = ['full_name', 'phone', 'email', 'address', 'division', 'district', 'area', 'payment_method', 'items']

    # This handles saving the Order AND the OrderItems into PostgreSQL at the same time
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order