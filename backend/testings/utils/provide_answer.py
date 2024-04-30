from testings.constants import QuestionTypes
from testings.models import Question, Answer


def provide_answer(user_answer: str | list[dict], question: Question):
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

        case QuestionTypes.RELATION:
            answers = list(
                question.answers
                .all()
                .prefetch_related("relations")
                .order_by("id")
            )
            user_answers = sorted(user_answer, key=lambda x: x["answer_id"])

            for answer, user_answer_ in zip(answers, user_answers):
                if answer.id == user_answer_["answer_id"]:
                    relation_id: int | None = getattr(answer.relations.all().first(), "id", None)
                    if not (incorrect := relation_id == user_answer_["relation_id"]):
                        return incorrect
            else:
                return True

        case _:
            return False
