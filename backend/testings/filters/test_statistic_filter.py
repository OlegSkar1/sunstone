from django_filters import FilterSet, NumberFilter

from testings.models import UserTestStatistics


class TestStatisticFilter(FilterSet):
    user_filter = NumberFilter(field_name="user", label="Фильтр по id пользователя")
    lesson_filter = NumberFilter(field_name="testing__lesson", label="Фильтр по id урока")
    material_filter = NumberFilter(field_name="testing__lesson__material", label="Фильтр по id материала")

    class Meta:
        model = UserTestStatistics
        fields = ()
