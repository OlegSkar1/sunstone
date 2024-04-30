from django.db.models import TextChoices


class QuestionTypes(TextChoices):
    SINGLE_CHOICES = "single_choices", "одиночный выбор"
    MULTIPLE_CHOICES = "multiple_choices", "множественный выбор"
    INPUT = "input", "ввод ответа"
    RELATION = "relation", "соответствие"


class TestModes(TextChoices):
    EXAM = "exam", "экзамен"
    TRAINING = "training", "тренировка"
