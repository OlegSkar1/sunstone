from django.db.models import Q
from django.urls import reverse
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        default_lookup = (
            Q(material_id=instance.material.pk) & ~Q(id=instance.pk)
        )
        previous = self.get_queryset().filter(
            default_lookup & Q(order__lte=instance.order)
        ).first()
        next = self.get_queryset().filter(
            default_lookup & Q(order__gte=instance.order),
        ).last()
        serializer = self.get_serializer(
            instance,
            context={
                "previous": reverse("lessons-detail", args=(previous.pk,)) if getattr(previous, "pk", None) else None,
                "next": reverse("lessons-detail", args=(next.pk,)) if getattr(next, "pk", None) else None,
                "request": request,
            }
        )
        return Response(serializer.data)
