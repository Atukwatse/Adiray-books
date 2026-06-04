from django.db import models


class Book(models.Model):
    CATEGORY_CHOICES = [
        ('technology', 'Technology'),
        ('fiction', 'Fiction'),
        ('nonfiction', 'Non-Fiction'),
        ('business', 'Business'),
        ('educational', 'Educational'),
        ('inspirational', 'Inspirational'),
        ('novels', 'Novels'),
        ('childrens', "Children's"),
        ('teens-ya', 'Teens & YA'),
        ('audiobooks', 'Audiobooks'),
        ('ebooks', 'E-Books'),
        ('history', 'History'),
        ('psychology', 'Psychology'),
    ]

    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    original_price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    reviews = models.PositiveIntegerField(default=0)
    in_stock = models.BooleanField(default=True)
    cover = models.URLField(blank=True)
    cover_color = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    publisher = models.CharField(max_length=255, blank=True)
    published_date = models.CharField(max_length=50, blank=True)
    pages = models.PositiveIntegerField(null=True, blank=True)
    isbn = models.CharField(max_length=20, unique=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} by {self.author}'

    class Meta:
        ordering = ['-created_at']
