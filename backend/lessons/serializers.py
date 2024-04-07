from rest_framework import serializers

from common.rest_fields import MultiImageField
from lessons.models import Lesson
from .validators import YouTubeLinkValidator


class LessonListSerializer(serializers.ModelSerializer):
    """Сериализатор списка уроков"""

    preview_thumbnail = MultiImageField(required=False, read_only=True)
    author_email = serializers.ReadOnlyField(source="author.email", read_only=True)
    material_title = serializers.ReadOnlyField(source="material.title", read_only=True)

    class Meta:
        model = Lesson
        fields = (
            "id",
            "title",
            "preview_thumbnail",
            "author_id",
            "author_email",
            "material_id",
            "material_title"
        )


class LessonDetailSerializer(serializers.ModelSerializer):
    """Сериализатор детальной информации об уроке"""

    preview_display = MultiImageField(required=False, read_only=True)
    author_email = serializers.ReadOnlyField(source="author.email", read_only=True)
    material_title = serializers.ReadOnlyField(source="material.title", read_only=True)
    youtube_link = serializers.URLField(validators=[YouTubeLinkValidator()])

    class Meta:
        model = Lesson
        fields = (
            "id",
            "title",
            "preview_display",
            "author_email",
            "author_id",
            "text",
            "material_title",
            "material_id",
            "youtube_link",
        )
