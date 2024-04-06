from django.conf import settings
from django.db import models

from common.models import MultiImageMeta, Spec


class UserProfile(models.Model, metaclass=MultiImageMeta):
    """Профиль пользователя"""

    AVATAR_WIDTH = 1024
    AVATAR_HEIGHT = 768

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="profile",
    )
    name = models.CharField(
        verbose_name="Имя",
        max_length=128,
        null=True,
        blank=True,
    )
    last_name = models.CharField(
        verbose_name="Фамилия",
        max_length=128,
        null=True,
        blank=True,
    )
    avatar = models.ImageField(
        verbose_name="Аватар",
        upload_to="users/avatars/",
        null=True,
        blank=True
    )

    image_map = {
        "avatar_display": Spec("avatar", AVATAR_WIDTH, AVATAR_HEIGHT),
        "avatar_preview": Spec("avatar", AVATAR_WIDTH, AVATAR_HEIGHT, True)
    }

    def __str__(self):
        return f"{self.user.email}"

    class Meta:
        verbose_name = "Профиль"
        verbose_name_plural = "Профили"
