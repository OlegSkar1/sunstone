from django.db.models import Prefetch
from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from sections.pagination import SectionPagination

from ..models import Testing, Question, UserTestStatistics
from ..serializers import (
    QuestionSerializer,
    TestingListSerializer,
    InputAnswerSerializer,
    AnswerCheckSerializer,
    TestingDetailSerializer,
    InputRelationAnswerSerializer,
)
from ..utils import provide_answer, write_statistic_for_question
from ..filters import TestingFilter
from ..constants import TestModes, QuestionTypes


@extend_schema(tags=["Testings"])
class TestingViewSet(viewsets.ReadOnlyModelViewSet):
    """Получение информации о тестах"""

    queryset = Testing.objects.all().order_by('id')
    permission_classes = [IsAuthenticated]
    pagination_class = SectionPagination
    filterset_class = TestingFilter

    def get_queryset(self):
        queryset = self.queryset

        match self.action:
            case self.list.__name__:
                queryset = (
                    queryset
                    .select_related("lesson")
                )
            case self.retrieve.__name__:
                queryset = (
                    queryset
                    .select_related(
                        "lesson",
                    )
                    .prefetch_related(
                        "questions",
                        "questions__answers",
                        Prefetch(
                            "users_statistics",
                            queryset=UserTestStatistics.objects.filter(
                                testing=self.kwargs["pk"],
                                user=self.request.user,
                            )
                        )
                    )
                )
        return queryset

    def get_serializer_class(self):
        match self.action:
            case self.list.__name__:
                return TestingListSerializer
            case self.retrieve.__name__:
                return TestingDetailSerializer


@extend_schema(tags=["Testings"])
class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    """Получение информации о вопросах"""

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = self.queryset

        match self.action:
            case self.list.__name__:
                queryset = (
                    queryset
                    .select_related("testing")
                )
            case self.retrieve.__name__ | self.check_answer.__name__:
                queryset = (
                    queryset
                    .select_related("testing")
                    .prefetch_related(
                        "answers",
                        "question_statistics",
                    )
                )

        return queryset

    @extend_schema(
        request={
            f"{QuestionTypes.INPUT.value}": InputAnswerSerializer,
            f"{QuestionTypes.SINGLE_CHOICES.value}": InputAnswerSerializer,
            f"{QuestionTypes.MULTIPLE_CHOICES.value}": InputAnswerSerializer,
            f"{QuestionTypes.RELATION.value}": InputRelationAnswerSerializer,
        },
        responses={status.HTTP_200_OK: OpenApiResponse(response=AnswerCheckSerializer)})
    @action(detail=True, methods=["POST"])
    def check_answer(self, request, pk=None):
        """Првоерка ответа на вопрос в тесте"""

        user_answer = request.data.get("answer")
        test_mode = request.data.get("test_mode")
        question = self.get_object()

        response_map = {
            True: {
                "ok": True,
            },
            False: {
                "ok": False,
            },
            "status_code": status.HTTP_200_OK,
        }

        if test_mode == TestModes.EXAM:
            write_statistic_for_question(
                user=request.user,
                question=question,
                user_answer=user_answer,
            )

        return Response(
            response_map[provide_answer(user_answer, question)]
            if test_mode == TestModes.TRAINING else {},
            status=response_map["status_code"]
        )
