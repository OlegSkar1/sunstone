from django_filters import FilterSet

from testings.models import Testing


class TestingFilter(FilterSet):
    class Meta:
        model = Testing
        fields = ("lesson_id",)
