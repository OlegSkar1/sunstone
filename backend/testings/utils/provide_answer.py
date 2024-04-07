from testings.constants import QuestionTypes
from testings.models import Question


def provide_answer(user_answer: str, question: Question):
    question_type = question.type

    match question_type:
        case QuestionTypes.SINGLE_CHOICES:
            true_answer = (
                question
                .answers
                .filter(text=user_answer, is_correct=True)
            )

            return true_answer.exists()

        case QuestionTypes.MULTIPLE_CHOICES:
            true_answers = set(
                question
                .answers
                .filter(is_correct=True)
                .values_list("text", flat=True)
            )
            user_answers = set(user_answer)

            return not (true_answers ^ user_answers)

        case QuestionTypes.INPUT:
            return user_answer == question.answers.filter(is_correct=True).first().text

        case _:
            return False
