import json
from pathlib import Path
from django.core.management.base import BaseCommand
from books.models import Book


class Command(BaseCommand):
    help = 'Seed books from data/books.json'

    def handle(self, *args, **options):
        data_file = Path(__file__).resolve().parents[4] / 'data' / 'books.json'
        if not data_file.exists():
            self.stderr.write(f'File not found: {data_file}')
            return

        with open(data_file, 'r') as f:
            books = json.load(f)

        created = 0
        for book in books:
            obj, new = Book.objects.update_or_create(
                isbn=book.get('isbn', str(book['id'])),
                defaults={
                    'title': book['title'],
                    'author': book['author'],
                    'price': book['price'],
                    'original_price': book.get('originalPrice'),
                    'category': book['category'],
                    'rating': book.get('rating', 0),
                    'reviews': book.get('reviews', 0),
                    'in_stock': book.get('inStock', True),
                    'cover': book.get('cover', ''),
                    'cover_color': book.get('coverColor', ''),
                    'description': book.get('description', ''),
                    'publisher': book.get('publisher', ''),
                    'published_date': book.get('publishedDate', ''),
                    'pages': book.get('pages'),
                    'featured': book.get('featured', False),
                },
            )
            if new:
                created += 1

        self.stdout.write(self.style.SUCCESS(
            f'Done. {created} books created, {len(books) - created} updated.'
        ))
