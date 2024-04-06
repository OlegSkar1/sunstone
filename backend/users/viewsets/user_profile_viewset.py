from django.db.models import Prefetch
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from materials.models import Material
from users.models import UserProfile
from users.serializers import UserProfileListSerializer, UserProfileDetailSerializer
from sections.pagination import SectionPagination


class UserProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserProfile.objects.select_related("user")
    permission_classes = [IsAuthenticated]
    pagination_class = SectionPagination

    def get_queryset(self):
        queryset = self.queryset

        match self.action:
            case self.retrieve.__name__:
                queryset = (
                    queryset
                    .prefetch_related(
                        Prefetch(
                            "user__materials",
                            queryset=Material.objects.filter(author=self.kwargs["pk"])
                        )
                    )
                )

        return queryset

    def get_serializer_class(self):
        match self.action:
            case self.retrieve.__name__:
                return UserProfileDetailSerializer
            case self.list.__name__:
                return UserProfileListSerializer
