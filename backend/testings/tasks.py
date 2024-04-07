from celery import shared_task

from testings.models import UserTestStatistics, UserQuestionTestStatistics, Question


@shared_task
def update_user_test_statistic(user, question, user_answer: str):
    """Запись статистики по ответу на вопрос от пользователя"""

    question = Question.objects.get(pk=question)

    main_test_statistic, _ = UserTestStatistics.objects.get_or_create(
        testing=question.testing,
        user_id=user,
    )

    question_statistic = UserQuestionTestStatistics.objects.create(
        user_id=user,
        question=question,
        test_statistic=main_test_statistic,
        user_variant=user_answer,
    )

    question_statistic.save()

    # main_test_statistic.add(question_statistic)
    return {"status": "Статистика записана успешно"}
