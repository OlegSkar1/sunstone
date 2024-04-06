from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

from common.models import MultiImageMeta, Spec


class Section(models.Model, metaclass=MultiImageMeta):
    """Раздел"""

    IMAGE_WIDTH = 1440
    IMAGE_HEIGHT = 980

    name = models.CharField(
        verbose_name="Название",
        max_length=128,
    )
    description = CKEditor5Field(
        verbose_name="Описание",
        blank=True,
        null=True,
    )
    image = models.ImageField(
        verbose_name="Изображение",
        upload_to="sections/images",
        blank=True,
        null=True,
    )

    image_map = {
        "image_display": Spec("image", IMAGE_WIDTH, IMAGE_HEIGHT),
        "image_preview": Spec("image", IMAGE_WIDTH, IMAGE_HEIGHT, True),
    }

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Раздел"
        verbose_name_plural = "Разделы"
