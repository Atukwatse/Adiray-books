from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Book
from .serializers import BookSerializer, BookListSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'featured', 'in_stock']
    search_fields = ['title', 'author', 'description']
    ordering_fields = ['price', 'rating', 'created_at', 'title']

    def get_serializer_class(self):
        if self.action == 'list':
            return BookListSerializer
        return BookSerializer
