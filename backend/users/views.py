from rest_framework import generics, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.db.models import Count, Sum
from .serializers import UserSerializer, RegisterSerializer, ChangePasswordSerializer

User = get_user_model()


class IsAdminOrManager(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role in ['admin', 'manager']
        )


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class ProfileView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({'detail': 'Wrong password.'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({'detail': 'Password updated.'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        first_name = request.data.get('first_name') or request.data.get('firstName') or email.split('@')[0]
        last_name = request.data.get('last_name') or request.data.get('lastName') or 'User'

        user, _created = User.objects.get_or_create(
            email=email,
            defaults={
                'first_name': first_name,
                'last_name': last_name,
                'role': 'customer',
            },
        )

        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data,
        })


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrManager]

    def get_queryset(self):
        return User.objects.annotate(
            orders_count=Count('orders'),
            total_spent=Sum('orders__total'),
        ).order_by('-joined_date', 'email')

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        password = data.pop('password', 'AdirayBooks123!')
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create_user(password=password, **serializer.validated_data)
        return Response(self.get_serializer(user).data, status=status.HTTP_201_CREATED)
