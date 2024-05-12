from testings.models import Question, UserQuestionTestStatistics, UserTestStatistics
from users.models import User

from ..tasks import update_user_test_statistic


def write_statistic_for_question(user: User, question: Question, user_answer: str, is_correct: bool) -> None:
    """Запись статистики по ответу на вопрос от пользователя"""

    update_user_test_statistic.delay(user.id, question.id, user_answer, is_correct)
