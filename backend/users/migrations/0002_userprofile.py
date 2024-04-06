# Generated by Django 4.2 on 2024-04-06 10:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="UserProfile",
            fields=[
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        related_name="profile",
                        serialize=False,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        blank=True, max_length=128, null=True, verbose_name="Имя"
                    ),
                ),
                (
                    "last_name",
                    models.CharField(
                        blank=True, max_length=128, null=True, verbose_name="Фамилия"
                    ),
                ),
                (
                    "avatar",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="users/avatars/",
                        verbose_name="Аватар",
                    ),
                ),
            ],
            options={
                "verbose_name": "Профиль",
                "verbose_name_plural": "Профили",
            },
        ),
    ]