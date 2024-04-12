from django.db.models import Prefetch
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from materials.models import Material
from users.models import UserProfile
from users.serializers import UserProfileListSerializer, UserProfileDetailSerializer
from sections.pagination import SectionPagination
from testings.models import UserTestStatistics


class UserProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """Профили пользователей"""

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
                        ),
                        Prefetch(
                            "user__user_statistics",
                            queryset=UserTestStatistics.objects.filter(user=self.request.user)
                        )
                    )
                )
            case self.myprofile.__name__:
                queryset = (
                    queryset
                    .filter(user=self.request.user)
                    .prefetch_related(
                        Prefetch(
                            "user__materials",
                            queryset=Material.objects.filter(author=self.request.user)
                        ),
                        Prefetch(
                            "user__user_statistics",
                            queryset=UserTestStatistics.objects.filter(user=self.request.user)
                        )
                    )
                )

        return queryset

    @action(detail=False, methods=["GET", "PUT", "PATCH"])
    def myprofile(self, request, *args, **kwargs):
        """Профиль текущего авторизованного пользователя"""

        queryset = self.get_queryset().first()
        serializer = self.get_serializer(
            queryset,
            many=False,
        )
        return Response(serializer.data)

    def get_serializer_class(self):
        match self.action:
            case self.retrieve.__name__ | self.myprofile.__name__:
                return UserProfileDetailSerializer
            case self.list.__name__:
                return UserProfileListSerializer
