from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser

from ..models import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data) -> AbstractBaseUser:
        user = get_user_model().objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User already exists")
        return value

    class Meta:
        model = User
        fields = ("username", "email", "password")
