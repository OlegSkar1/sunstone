from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from common.rest_fields import MultiImageField
from materials.serializers import MaterialListSerializer
from testings.serializers import TestingUserStatisticsDetailSerializer

from ..models import UserProfile


class UserProfileListSerializer(serializers.ModelSerializer):
    """Сериализатор списка пользователей"""
    user = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            "user",
            "name",
            "last_name",
        )


class UserProfileDetailSerializer(UserProfileListSerializer):
    """Сериализатор детального профиля пользователя"""

    user_materials = serializers.SerializerMethodField(read_only=True)
    user_test_statistics = serializers.SerializerMethodField(read_only=True)
    user_email = serializers.ReadOnlyField(source="user.email", read_only=True)
    avatar = serializers.ImageField(write_only=True)
    avatar_display = MultiImageField(required=False, read_only=True)
    avatar_preview = MultiImageField(required=False, read_only=True)

    class Meta(UserProfileListSerializer.Meta):
        fields = (
            UserProfileListSerializer.Meta.fields + (
                "user_email",
                "avatar_display",
                "avatar_preview",
                "avatar",
                "user_materials",
                "user_test_statistics",
            )
        )

    @extend_schema_field(MaterialListSerializer)
    def get_user_materials(self, obj):
        serializer = MaterialListSerializer(
            obj.user.materials,
            many=True,
            context={"request": self.context.get("request")}
        )
        return serializer.data

    @extend_schema_field(TestingUserStatisticsDetailSerializer)
    def get_user_test_statistics(self, obj):
        serializer = TestingUserStatisticsDetailSerializer(
            obj.user.user_statistics,
            many=True,
            context={"request": self.context.get("request")}
        )
        return serializer.data
