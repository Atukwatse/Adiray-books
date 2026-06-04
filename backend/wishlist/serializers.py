from rest_framework import serializers
from books.models import Book
from .models import WishlistItem
from books.serializers import BookListSerializer


class WishlistItemSerializer(serializers.ModelSerializer):
    book = BookListSerializer(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), source='book', write_only=True
    )

    class Meta:
        model = WishlistItem
        fields = ['id', 'book', 'book_id', 'added_at']
        read_only_fields = ['id', 'added_at']
