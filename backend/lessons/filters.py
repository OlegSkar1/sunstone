from django_filters import FilterSet, NumberFilter

from lessons.models import Lesson


class LessonFilter(FilterSet):
    material_id = NumberFilter(field_name="material_id", label="Фильтр по id материала")

    class Meta:
        model = Lesson
        fields = ()
