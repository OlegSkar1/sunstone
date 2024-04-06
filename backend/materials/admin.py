from django.contrib import admin

from materials.models import Material


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    pass
