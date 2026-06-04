# Adiray Books - Django Backend

Django REST API backend for the Adiray Books online bookstore.

## Features

- **Books API**: CRUD operations, filtering, search, and pagination
- **User Authentication**: JWT-based auth with registration and login
- **Orders Management**: Create and track orders with status updates
- **Wishlist**: User-specific wishlist functionality
- **Admin Panel**: Django admin for data management

## Tech Stack

- Django 6.0.3
- Django REST Framework
- JWT Authentication (Simple JWT)
- SQLite (development) / PostgreSQL (production ready)
- CORS Headers for React frontend integration

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment:**
   Copy `.env` file and update as needed.

3. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

4. **Seed initial data:**
   ```bash
   python manage.py seed_books
   ```

5. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server:**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login (get JWT tokens)
- `POST /api/auth/refresh/` - Refresh access token
- `GET /api/auth/profile/` - Get current user profile
- `PUT /api/auth/profile/` - Update profile
- `POST /api/auth/change-password/` - Change password

### Books
- `GET /api/books/` - List all books (with filters, search, pagination)
- `GET /api/books/{id}/` - Get book details
- `POST /api/books/` - Create book (admin only)
- `PUT /api/books/{id}/` - Update book (admin only)
- `DELETE /api/books/{id}/` - Delete book (admin only)

### Orders
- `GET /api/orders/` - List user orders
- `GET /api/orders/{id}/` - Get order details
- `POST /api/orders/` - Create new order
- `POST /api/orders/{id}/cancel/` - Cancel order

### Wishlist
- `GET /api/wishlist/` - Get user wishlist
- `POST /api/wishlist/` - Add book to wishlist
- `DELETE /api/wishlist/{id}/` - Remove from wishlist

## Admin Panel

Access at `http://localhost:8000/admin/`
