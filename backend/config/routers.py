from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from users.viewsets import UserViewSet

if settings.API_DOCS_ENABLE:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet, basename="users")
