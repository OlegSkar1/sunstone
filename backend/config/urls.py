from django.conf.urls.static import static
from django.contrib import admin
from django.template.defaulttags import url
from django.urls import path, include, re_path
from django.conf import settings

from .routers import router

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("users.urls", namespace="users")),
    path("api/", include(router.urls)),
    path(r"nested_admin/", include("nested_admin.urls")),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += (path("api/__debug__/", include(debug_toolbar.urls)),)

if settings.API_DOCS_ENABLE:
    from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

    urlpatterns += (
        path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
        path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    )

urlpatterns += [
    path("ckeditor5/", include('django_ckeditor_5.urls'), name="ck_editor_5_upload_file"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
