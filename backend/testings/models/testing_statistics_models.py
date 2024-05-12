from django.conf import settings
from django.db import models


class UserTestStatistics(models.Model):
    """Модель статистики пользователя по тесту"""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name="Пользователь",
        on_delete=models.CASCADE,
        related_name="user_statistics"
    )
    testing = models.ForeignKey(
        "testings.Testing",
        verbose_name="Урок",
        on_delete=models.CASCADE,
        related_name="user_testings"
    )
    percentage_of_correct_answers = models.FloatField(
        verbose_name="Процент правильных ответов",
        default=0.0,
    )

    def __str__(self):
        return (
            f"{self.user.email} |"
            f"{self.testing.title} |"
            f"{self.percentage_of_correct_answers}"
        )

    class Meta:
        verbose_name = "Статистика пользователя по тесту"
        verbose_name_plural = "Статистики пользователей по тестам"


class UserQuestionTestStatistics(models.Model):
    """Статистика по вопросу для пользователя"""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name="Пользователь",
        on_delete=models.CASCADE,
        related_name="question_test_statistics",
    )
    test_statistic = models.ForeignKey(
        "testings.UserTestStatistics",
        verbose_name="Статистика по тесту",
        on_delete=models.CASCADE
    )
    question = models.ForeignKey(
        "testings.Question",
        verbose_name="Вопрос",
        on_delete=models.CASCADE,
        related_name="question_statistics",
    )
    is_correct = models.BooleanField(
        verbose_name="Верно",
        default=False
    )
    user_variant = models.CharField(
        verbose_name="Вариант пользователя",
        max_length=256,
    )

    def __str__(self):
        return (
            f"{self.user.email} |"
            f"ID Вопроса: {self.question.id}"
        )

    class Meta:
        verbose_name = "Статистика пользователя по вопросу теста"
        verbose_name_plural = "Статистики пользователей по вопросам тестов"