from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from sections.pagination import SectionPagination

from .models import Material
from .serializers import MaterialListSerializer, MaterialDetailSerializer
from .filters import MaterialFilter


@extend_schema(tags=["Materials"])
class MaterialViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = SectionPagination
    permission_classes = [IsAuthenticated]
    filterset_class = MaterialFilter
    queryset = (
        Material.objects
        .select_related(
            "author",
            "section",
        )
    )

    def get_serializer_class(self):
        match self.action:
            case self.list.__name__:
                return MaterialListSerializer
            case self.retrieve.__name__:
                return MaterialDetailSerializer
