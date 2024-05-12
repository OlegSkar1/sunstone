from django.db.models import Prefetch
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from sections.pagination import SectionPagination

from ..models import UserTestStatistics, Answer
from ..serializers import TestingUserStatisticsListSerializer, TestingUserStatisticsDetailSerializer
from ..filters import TestStatisticFilter


@extend_schema(tags=["Testings"])
class TestingStatisticsViewSet(viewsets.ReadOnlyModelViewSet):
    """Получение статистики по тестам"""

    queryset = UserTestStatistics.objects.all()
    pagination_class = SectionPagination
    permission_classes = [IsAuthenticated]
    filterset_class = TestStatisticFilter

    def get_serializer_class(self):
        match self.action:
            case self.list.__name__:
                return TestingUserStatisticsListSerializer
            case self.retrieve.__name__:
                return TestingUserStatisticsDetailSerializer

    def get_queryset(self):
        queryset = self.queryset

        match self.action:
            case self.list.__name__:
                queryset = (
                    queryset
                    .select_related("user", "testing")
                )
            case self.retrieve.__name__:
                queryset = (
                    queryset
                    .select_related(
                        "user",
                        "testing",
                        "testing__lesson",
                    )
                    .prefetch_related(
                        "userquestionteststatistics_set",
                        "testing__questions",
                        Prefetch(
                            "testing__questions__answers",
                            queryset=Answer.objects.filter(is_correct=True)
                        )
                    )
                )

        return queryset
