from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiParameter
from rest_framework import viewsets, status, mixins
from rest_framework import serializers
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from sections.models import Section
from materials.models import Material
from lessons.models import Lesson
from sections.serializers import SectionSerializer
from materials.serializers import MaterialListSerializer
from lessons.serializers import LessonListSerializer


class SearchSerializer(serializers.Serializer):
    sections = SectionSerializer(many=True, read_only=True)
    materials = MaterialListSerializer(many=True, read_only=True)
    lessons = LessonListSerializer(many=True, read_only=True)


@extend_schema(tags=["Site Search"])
class SiteSearchViewSet(viewsets.GenericViewSet):
    """Поиск по разделам, материалам, урокам по сайту"""

    permission_classes = [IsAuthenticated]
    serializer_class = SearchSerializer

    @extend_schema(
        responses={status.HTTP_200_OK: OpenApiResponse(response=SearchSerializer)},
        parameters=[
            OpenApiParameter(name="search",
                             type=str,
                             location=OpenApiParameter.QUERY,
                             description="Поиск по сайту"),
        ]
    )
    @action(detail=False, methods=["GET"])
    def search(self, request):
        search_query = request.query_params.get("search")

        if search_query:
            sections = list(Section.objects.filter(name__iregex=search_query).values())
            materials = list(Material.objects.filter(title__iregex=search_query).values())
            lessons = list(Lesson.objects.filter(title__iregex=search_query).values())

            data = {
                "sections": sections,
                "materials": materials,
                "lessons": lessons,
            }

            return Response(data)

        return Response(status=status.HTTP_400_BAD_REQUEST)
