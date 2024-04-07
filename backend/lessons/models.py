from django.conf import settings
from django.db import models

from django_ckeditor_5.fields import CKEditor5Field

from common.models import MultiImageMeta, Spec


class Lesson(models.Model, metaclass=MultiImageMeta):
    PREVIEW_WIDTH = 1024
    PREVIEW_HEIGHT = 768
    PREVIEW_THUMBNAIL_WIDTH = 102
    PREVIEW_THUMBNAIL_HEIGHT = 77

    title = models.CharField(
        verbose_name="Заголовок",
        max_length=256,
    )
    text = CKEditor5Field(
        verbose_name="Текст урока",
        blank=True,
        null=True,
    )
    preview = models.ImageField(
        verbose_name="Превью",
        upload_to="lessons/previews/",
        blank=True,
        null=True,
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name="Автор",
        on_delete=models.SET_NULL,
        null=True,
        related_name="lessons",
    )
    material = models.ForeignKey(
        "materials.Material",
        verbose_name="Материал",
        on_delete=models.CASCADE,
        related_name="lessons",
    )
    youtube_link = models.URLField(
        verbose_name="Ссылка на youtube",
        blank=True,
        null=True,
    )

    image_map = {
        "preview_display": Spec("preview", PREVIEW_WIDTH, PREVIEW_HEIGHT),
        "preview_thumbnail": Spec("preview", PREVIEW_WIDTH, PREVIEW_HEIGHT, crop=True)
    }

    def __str__(self):
        return f"{self.title} | Автор: {self.author}"

    class Meta:
        verbose_name = "Урок"
        verbose_name_plural = "Уроки"
