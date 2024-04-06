from rest_framework import serializers

from common.rest_fields import MultiImageField

from .models import Section


class SectionSerializer(serializers.ModelSerializer):
    image_display = MultiImageField(required=False, read_only=True)
    image_preview = MultiImageField(required=False, read_only=True)

    class Meta:
        model = Section
        fields = (
            "name",
            "description",
            "image_display",
            "image_preview",
        )
