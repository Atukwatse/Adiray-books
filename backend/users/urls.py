from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, ProfileView, ChangePasswordView, GoogleLoginView, UserViewSet

router = SimpleRouter()
router.register(r'users', UserViewSet, basename='admin-user')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('google/', GoogleLoginView.as_view(), name='google-login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('', include(router.urls)),
]
