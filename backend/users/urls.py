from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .viewsets import CustomTokenObtainPairView
from .serializers import CustomTokenRefreshSerializer
from .apps import UsersConfig

app_name = UsersConfig.name


urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(
        'token/refresh/',
        TokenRefreshView.as_view(serializer_class=CustomTokenRefreshSerializer),
        name='token_refresh'
    ),
]
