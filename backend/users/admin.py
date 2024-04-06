from .models import User, UserProfile
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    classes = ["collapse"]


@admin.register(User)
class UserAdmin(UserAdmin):
    ordering = ["email"]
    list_display = ["email", "first_name", "last_name", "is_staff", "is_active"]
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal Info",
            {"fields": ("first_name", "last_name")},
        ),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    inlines = [UserProfileInline]
