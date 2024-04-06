from django.conf import settings
from django.db import models

from django_ckeditor_5.fields import CKEditor5Field

from sections.models import Section


class Material(models.Model):
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
    text = CKEditor5Field(
        verbose_name="Текст материала",
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} | {self.author} | {self.section}"

    class Meta:
        verbose_name = "Материал"
        verbose_name_plural = "Материалы"
