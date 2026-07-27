from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer, OrderSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def get_products(request):
    products = Product.objects.filter(is_active=True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# NEW: Receive Order Data
@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Order created successfully!"}, status=status.HTTP_201_CREATED)
    
    # If the frontend sent bad data, tell it what went wrong
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# NEW: Fetch a single product by its slug
@api_view(['GET'])
def get_product(request, slug):
    # Find the active product with this slug, or return a 404 error if it doesn't exist
    product = get_object_or_404(Product, slug=slug, is_active=True)
    serializer = ProductSerializer(product)
    return Response(serializer.data)