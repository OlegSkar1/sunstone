from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager


class UserQuerySet(UserManager):
    """
    Менеджер пользователя
    """


class User(AbstractUser):
    """
    Пользователь
    """
    username = None
    email = models.EmailField(
        verbose_name="Почта",
        unique=True
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects: UserQuerySet = UserQuerySet()

    def __str__(self) -> str:
        return self.username

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
