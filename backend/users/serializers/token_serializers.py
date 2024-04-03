from datetime import datetime
import pytz
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.settings import api_settings


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        utc_timezone = pytz.timezone('UTC')
        current_time = datetime.now(tz=utc_timezone)

        data['access_expires_at'] = str(current_time + refresh.access_token.lifetime)
        data['refresh_expires_at'] = str(current_time + refresh.lifetime)

        return data


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        refresh = self.token_class(attrs["refresh"])

        utc_timezone = pytz.timezone('UTC')
        current_time = datetime.now(tz=utc_timezone)

        data = {
            "access": str(refresh.access_token),
            "expires_at": str(current_time + refresh.access_token.lifetime)
        }

        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass

            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()

            data["refresh"] = str(refresh)

        return data
