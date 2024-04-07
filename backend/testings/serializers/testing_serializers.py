from rest_framework import serializers

from testings.models import Testing, Question, Answer


class InputAnswerSerializer(serializers.Serializer):
    answer = serializers.CharField(required=True)


class AnswerCheckSerializer(serializers.Serializer):
    ok = serializers.BooleanField(required=True)


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        exclude = ("is_correct",)


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = "__all__"


class TestingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testing
        fields = (
            "id",
            "title",
            "description",
            "lesson",
        )


class TestingDetailSerializer(TestingListSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta(TestingListSerializer.Meta):
        fields = TestingListSerializer.Meta.fields + ("questions", "users_statistics")
