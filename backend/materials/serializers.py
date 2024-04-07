from rest_framework import serializers

from common.rest_fields import MultiImageField
from materials.models import Material


class MaterialListSerializer(serializers.ModelSerializer):
    """Сериализатор списка материалов"""

    image_display = MultiImageField(required=False, read_only=True)
    section_slug = serializers.ReadOnlyField(source="section.slug", read_only=True)

    class Meta:
        model = Material
        fields = (
            "id",
            "title",
            "short_description",
            "image_display",
            "author",
            "section_slug",
            "created_at",
            "updated_at"
        )


class MaterialDetailSerializer(MaterialListSerializer):
    """Сериализатор детальной информации материала"""

    class Meta(MaterialListSerializer.Meta):
        fields = MaterialListSerializer.Meta.fields + ("text",)
