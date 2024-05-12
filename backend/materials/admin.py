from django.contrib import admin

from adminsortable2.admin import SortableInlineAdminMixin, SortableAdminBase
from django.urls import reverse
from django.utils.html import format_html

from lessons.models import Lesson
from materials.models import Material


class LessonInline(SortableInlineAdminMixin, admin.StackedInline):
    model = Lesson
    fields = ("lesson_link",)
    extra = 0
    readonly_fields = fields

    def lesson_link(self, obj):
        return format_html(
            '<a href="{0}">{1}</a>'.format(
                reverse("admin:lessons_lesson_change", args=(obj.pk,)),
                obj.title
            )
        )


@admin.register(Material)
class MaterialAdmin(SortableAdminBase, admin.ModelAdmin):
    inlines = [LessonInline]
