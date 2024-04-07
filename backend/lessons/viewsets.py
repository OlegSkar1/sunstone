from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from sections.pagination import SectionPagination

from lessons.models import Lesson
from lessons.serializers import LessonDetailSerializer, LessonListSerializer


@extend_schema(tags=["Lessons"])
class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Lesson.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = SectionPagination

    def get_queryset(self):
        queryset = self.queryset

        queryset = (
            queryset
            .select_related(
                "material",
                "author",
            )
        )

        return queryset

    def get_serializer_class(self):
        match self.action:
            case self.list.__name__:
                return LessonListSerializer
            case self.retrieve.__name__:
                return LessonDetailSerializer
