from rest_framework_swagger import renderers
from rest_framework.schemas import SchemaGenerator
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf.urls import include, url
from django.urls import path
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic import RedirectView

from snippets import apiviews

from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Snippets API')


class SwaggerSchemaView(APIView):
    renderer_classes = [
        renderers.OpenAPIRenderer,
        renderers.SwaggerUIRenderer
    ]

    def get(self, request):
        generator = SchemaGenerator(
            title='API Documentation', urlconf='snippets.apiurls', url='/api/')
        schema = generator.get_schema(request=request)

        return Response(schema)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('react', include('frontend.urls')),
    path('api/', include('snippets.apiurls')),
    path('', include('accounts.urls')),
    url('', RedirectView.as_view(url='/react')),
    url(r'^apidocs/$', SwaggerSchemaView.as_view(), name='docs'),
]
