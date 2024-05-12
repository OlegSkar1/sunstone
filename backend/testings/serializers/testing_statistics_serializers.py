import json
import ast

from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from testings.models import UserTestStatistics, UserQuestionTestStatistics, Answer, Relation
from ..constants import QuestionTypes

from ..utils import provide_answer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ("text",)


class UserQuestionTestStatisticsSerializer(serializers.ModelSerializer):
    question_text = serializers.ReadOnlyField(source="question.text", read_only=True)
    question_type = serializers.ReadOnlyField(source="question.type", read_only=True)
    correct_answers = serializers.SerializerMethodField()
    user_variant = serializers.SerializerMethodField()

    class Meta:
        model = UserQuestionTestStatistics
        fields = (
            "id",
            "user",
            "question",
            "question_type",
            "question_text",
            "user_variant",
            "correct_answers",
        )

    @extend_schema_field(AnswerSerializer)
    def get_correct_answers(self, obj):
        if obj.question.type == QuestionTypes.RELATION:
            correct_answers = []
            for answer in obj.question.answers.prefetch_related("relations"):
                correct_answers.append(
                    {
                        answer.text: answer.relations.all().first().text
                    }
                )
            return correct_answers
        return AnswerSerializer(
            obj.question.answers.filter(is_correct=True),
            many=True,
            context={"request": self.context["request"]}
        ).data

    @staticmethod
    def get_user_variant(obj):
        user_answer = obj.user_variant

        if obj.question.type == QuestionTypes.RELATION:
            try:
                user_answer: list[dict] = ast.literal_eval(
                    str(obj.user_variant)
                )
                answers = (
                    Answer.objects
                    .filter(id__in=[answer["answer_id"] for answer in user_answer])
                    .values_list("text", flat=True)
                )
                relations = (
                    Relation.objects
                    .filter(id__in=[answer["relation_id"] for answer in user_answer])
                    .values_list("text", flat=True)
                )
                user_answer: str = str(
                    {
                        answer: relation
                        for answer, relation in zip(answers, relations)
                    }
                )
            except:
                pass

        return user_answer


class TestingUserStatisticsListSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source="user.email", read_only=True)
    testing_title = serializers.ReadOnlyField(source="testing.title", read_only=True)
    lesson_id = serializers.ReadOnlyField(source="testing.lesson_id", read_only=True)
    lesson_title = serializers.ReadOnlyField(source="testing.lesson.title", read_only=True)

    class Meta:
        model = UserTestStatistics
        fields = (
            "id",
            "user",
            "user_email",
            "lesson_id",
            "lesson_title",
            "testing",
            "testing_title",
        )


class TestingUserStatisticsDetailSerializer(TestingUserStatisticsListSerializer):
    percentage_of_correct_answers = serializers.SerializerMethodField()
    questions_statistics = UserQuestionTestStatisticsSerializer(
        source="userquestionteststatistics_set",
        many=True,
        read_only=True
    )

    class Meta(TestingUserStatisticsListSerializer.Meta):
        fields = (
            TestingUserStatisticsListSerializer.Meta.fields + (
                "percentage_of_correct_answers",
                "questions_statistics",
            )
        )

    @staticmethod
    def get_percentage_of_correct_answers(obj) -> float:
        questions_counter = obj.testing.questions.count()
        true_answers_counter = 0
        for question_statistic in obj.userquestionteststatistics_set.all().distinct("user_variant"):
            # Так как возможно получение списка в виде строки
            # нужно привести вариант пользователя к python типу
            try:
                user_variant: str | list[dict] = ast.literal_eval(
                   str(question_statistic.user_variant)
                )
            except (SyntaxError, ValueError):
                user_variant = question_statistic.user_variant

            if provide_answer(user_variant, question_statistic.question):
                true_answers_counter += 1

        return (true_answers_counter / questions_counter) * 100
