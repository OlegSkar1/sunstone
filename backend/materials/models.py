from django.conf import settings
from django.db import models

from django_ckeditor_5.fields import CKEditor5Field

from common.models import MultiImageMeta, Spec
from sections.models import Section


class Material(models.Model, metaclass=MultiImageMeta):
    IMAGE_WIDTH = 1024
    IMAGE_HEIGHT = 768

    section = models.ForeignKey(
        Section,
        verbose_name="Раздел",
        on_delete=models.CASCADE,
        related_name="materials"
    )
    author = models.ForeignKey(
        verbose_name="Автор материала",
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="materials",
    )
    title = models.CharField(
        verbose_name="Заголовок",
        max_length=256
    )
    short_description = models.TextField(
        verbose_name="Короткое описание",
        max_length=568,
        blank=True,
        null=True,
    )
    text = CKEditor5Field(
        verbose_name="Текст материала",
        blank=True,
        null=True,
    )
    image = models.ImageField(
        verbose_name="Превью",
        upload_to="materials/images",
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    image_map = {
        "image_display": Spec("image", IMAGE_WIDTH, IMAGE_HEIGHT),
    }

    def __str__(self):
        return f"{self.title} | {self.author} | {self.section}"

    class Meta:
        verbose_name = "Материал"
        verbose_name_plural = "Материалы"
