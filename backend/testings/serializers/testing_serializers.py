import random

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from common.rest_fields import MultiImageField
from testings.models import Testing, Question, Answer, Relation
from ..constants import TestModes


class ItemSerializer(serializers.Serializer):
    answer_id = serializers.IntegerField(required=True)
    relation_id = serializers.IntegerField(required=True)


class InputAnswerSerializer(serializers.Serializer):
    answer = serializers.CharField(required=True)
    test_mode = serializers.ChoiceField(choices=TestModes.choices, required=True)


class InputRelationAnswerSerializer(serializers.Serializer):
    answer = ItemSerializer(many=True, required=True)
    test_mode = serializers.ChoiceField(choices=TestModes.choices, required=True)


class AnswerCheckSerializer(serializers.Serializer):
    ok = serializers.BooleanField(required=True)


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        exclude = ("is_correct",)


class RelationSerializer(serializers.ModelSerializer):
    text = serializers.CharField(required=False, allow_blank=False, read_only=True)
    image_display = MultiImageField(read_only=True, allow_empty_file=False, required=False)
    image_preview = MultiImageField(read_only=True, allow_empty_file=False, required=False)

    class Meta:
        model = Relation
        fields = (
            "id",
            "image_display",
            "image_preview",
            "text",
        )


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    relations = serializers.SerializerMethodField(read_only=True, required=False)

    @extend_schema_field(RelationSerializer(many=True))
    def get_relations(self, obj):
        answers = obj.answers.all()

        relations = []

        for answer in answers:
            relations.extend(answer.relations.all())

        random.shuffle(relations)
        serializer = RelationSerializer(
            relations,
            many=True,
            context={
                "request": self.context["request"],
            }
        )
        return serializer.data

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
