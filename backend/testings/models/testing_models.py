from django.conf import settings
from django.db import models

from ..constants import QuestionTypes


class Testing(models.Model):
    """Модель теста урока"""

    title = models.CharField(
        verbose_name="Заголовок теста",
        max_length=128
    )
    description = models.TextField(
        verbose_name="Описание теста",
        blank=True,
        null=True,
        help_text="Необязательно",
    )
    lesson = models.ForeignKey(
        "lessons.Lesson",
        verbose_name="Урок",
        on_delete=models.CASCADE,
        related_name="tests",
    )
    users_statistics = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through="testings.UserTestStatistics"
    )

    def __str__(self):
        return f"{self.title} | {self.lesson.title}"

    class Meta:
        verbose_name = "Тест по уроку"
        verbose_name_plural = "Тесты по урокам"


class Question(models.Model):
    """Модель вопроса в тесте"""

    type = models.CharField(
        verbose_name="Тип вопроса",
        choices=QuestionTypes.choices,
    )
    text = models.TextField(
        verbose_name="Текст вопроса",
    )
    testing = models.ForeignKey(
        "testings.Testing",
        verbose_name="Тест",
        on_delete=models.CASCADE,
        related_name="questions"
    )

    def __str__(self):
        return f"{self.id}"

    class Meta:
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"


class Answer(models.Model):
    """Модель варианта овтета на вопрос"""

    text = models.TextField(
        verbose_name="Текст варианта овтета",
    )
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(
        "testings.Question",
        verbose_name="Связанный вопрос",
        on_delete=models.CASCADE,
        related_name="answers",
    )

    def __str__(self):
        return (
            f"ID Вопроса: {self.question.id} "
            f"| Верный: {self.is_correct} "
            f"| Тип вопроса: {self.question.type.upper()}"
        )

    class Meta:
        verbose_name = "Вариант ответа"
        verbose_name_plural = "Варианты ответа"
