from rest_framework import serializers

from materials.models import Material


class MaterialListSerializer(serializers.ModelSerializer):
    """Сериализатор списка материалов"""

    class Meta:
        model = Material
        fields = (
            "id",
            "title",
            "author",
            "section",
            "created_at",
            "updated_at"
        )


class MaterialDetailSerializer(MaterialListSerializer):
    """Сериализатор детальной информации материала"""

    class Meta(MaterialListSerializer.Meta):
        fields = MaterialListSerializer.Meta.fields + ("text",)
