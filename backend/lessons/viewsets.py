from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from sections.pagination import SectionPagination

from .models import Lesson
from .serializers import LessonDetailSerializer, LessonListSerializer
from .filters import LessonFilter


@extend_schema(tags=["Lessons"])
class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Lesson.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = SectionPagination
    filterset_class = LessonFilter

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
