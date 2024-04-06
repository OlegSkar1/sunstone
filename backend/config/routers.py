from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from users.viewsets import UserViewSet, UserProfileViewSet
from sections.viewsets import SectionViewSet
from materials.viewsets import MaterialViewSet

if settings.API_DOCS_ENABLE:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet, basename="users")
router.register("sections", SectionViewSet, basename="sections")
router.register("materials", MaterialViewSet, basename="materials")
router.register("profiles", UserProfileViewSet, basename="profiles")
