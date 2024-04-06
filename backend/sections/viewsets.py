from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Section
from .serializers import SectionSerializer
from .pagination import SectionPagination


@extend_schema(tags=["Sections"])
class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Получение разделов обучения
    """

    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = SectionPagination
