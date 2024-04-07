from rest_framework import serializers

from testings.models import UserTestStatistics, UserQuestionTestStatistics, Answer

from ..utils import provide_answer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ("text",)


class UserQuestionTestStatisticsSerializer(serializers.ModelSerializer):
    question_text = serializers.ReadOnlyField(source="question.text", read_only=True)
    correct_answers = serializers.SerializerMethodField()

    class Meta:
        model = UserQuestionTestStatistics
        fields = (
            "id",
            "user",
            "question",
            "question_text",
            "user_variant",
            "correct_answers",
        )

    def get_correct_answers(self, obj):
        return AnswerSerializer(
            obj.question.answers.filter(is_correct=True),
            many=True,
            context={"request": self.context["request"]}
        ).data


class TestingUserStatisticsListSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source="user.email", read_only=True)
    testing_title = serializers.ReadOnlyField(source="testing.title", read_only=True)

    class Meta:
        model = UserTestStatistics
        fields = (
            "id",
            "user",
            "user_email",
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
            if provide_answer(question_statistic.user_variant, question_statistic.question):
                true_answers_counter += 1

        return (true_answers_counter / questions_counter) * 100