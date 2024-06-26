import ast

from celery import shared_task

from testings.constants import QuestionTypes
from testings.models import UserTestStatistics, UserQuestionTestStatistics, Question, Answer, Relation


@shared_task
def update_user_test_statistic(user, question, user_answer: str, is_correct: bool):
    """Запись статистики по ответу на вопрос от пользователя"""

    question = Question.objects.get(pk=question)

    main_test_statistic, _ = UserTestStatistics.objects.get_or_create(
        testing=question.testing,
        user_id=user,
    )

    question_statistic = UserQuestionTestStatistics.objects.create(
        user_id=user,
        question=question,
        is_correct=is_correct,
        test_statistic=main_test_statistic,
        user_variant=user_answer,
    )

    question_statistic.save()

    # main_test_statistic.add(question_statistic)
    return {"status": "Статистика записана успешно"}
