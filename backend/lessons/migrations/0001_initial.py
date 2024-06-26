# Generated by Django 4.2 on 2024-04-07 06:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_ckeditor_5.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("materials", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Lesson",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=256, verbose_name="Заголовок")),
                (
                    "text",
                    django_ckeditor_5.fields.CKEditor5Field(
                        blank=True, null=True, verbose_name="Текст урока"
                    ),
                ),
                (
                    "preview",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="lessons/previews/",
                        verbose_name="Превью",
                    ),
                ),
                (
                    "youtube_link",
                    models.URLField(
                        blank=True, null=True, verbose_name="Ссылка на youtube"
                    ),
                ),
                (
                    "author",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="lessons",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Автор",
                    ),
                ),
                (
                    "material",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="lessons",
                        to="materials.material",
                        verbose_name="Материал",
                    ),
                ),
            ],
            options={
                "verbose_name": "Урок",
                "verbose_name_plural": "Уроки",
            },
        ),
    ]
