from django.contrib import admin
from .models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'price', 'rating', 'in_stock', 'featured']
    list_filter = ['category', 'featured', 'in_stock']
    search_fields = ['title', 'author', 'isbn']
    list_editable = ['featured', 'in_stock']
