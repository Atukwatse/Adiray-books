from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import Sum

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    orders_count = serializers.SerializerMethodField()
    total_spent = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'role',
            'joined_date',
            'orders_count',
            'total_spent',
        ]
        read_only_fields = ['id', 'joined_date']

    def get_orders_count(self, obj):
        if hasattr(obj, 'orders_count'):
            return obj.orders_count
        return obj.orders.count()

    def get_total_spent(self, obj):
        if hasattr(obj, 'total_spent'):
            return obj.total_spent or 0
        return obj.orders.aggregate(total=Sum('total'))['total'] or 0


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)
