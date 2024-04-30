from django.contrib import admin

from nested_admin.nested import NestedStackedInline, NestedModelAdmin

from testings.models import (
    Question,
    Answer,
    Relation,
    Testing,
    UserQuestionTestStatistics,
    UserTestStatistics
)


class RelationInline(NestedStackedInline):
    model = Relation
    classes = ("collapse",)
    extra = 0
    max_num = 1
    fk_name = "answer"


class AnswersInline(NestedStackedInline):
    model = Answer
    classes = ('collapse',)
    extra = 1
    inlines = (RelationInline,)


class QuestionsInline(NestedStackedInline):
    model = Question
    extra = 1
    classes = ('collapse',)
    inlines = (AnswersInline,)


@admin.register(Testing)
class TestingAdmin(NestedModelAdmin):
    inlines = (
        QuestionsInline,
    )


class QuestionStatisticInline(NestedStackedInline):
    model = UserQuestionTestStatistics
    can_delete = False
    extra = 0

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(UserTestStatistics)
class UserQuestionTestStatisticsAdmin(NestedModelAdmin):
    model = UserTestStatistics
    can_delete = False

    inlines = (QuestionStatisticInline,)

    def has_change_permission(self, request, obj=None):
        return False
