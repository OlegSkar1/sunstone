from django_filters import CharFilter, DateRangeFilter
from django_filters.rest_framework import FilterSet

from materials.models import Material


class MaterialFilter(FilterSet):
    author_filter = CharFilter(field_name="author", label="Фильтр по автору")
    section_filter = CharFilter(field_name="section__slug", label="Фильтр по разделу")
    update_date_filter = DateRangeFilter(field_name="update_date", label="Фильтр по времени изменения")

    class Meta:
        model = Material
        fields = ()
