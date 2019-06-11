from django.conf.urls import include, url
from django.contrib import admin


from django.urls import path, re_path
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import apiviews


urlpatterns = [
    path('snippets', apiviews.SnippetList.as_view()),
    path('snippets/<str:pk>', apiviews.SnippetDetail.as_view()),
    path('syntaxes', apiviews.SyntaxList.as_view()),
    path('trends/<str:time_period>', apiviews.TrendsList.as_view()),
    path('raw/<str:pk>', apiviews.SnippetRaw.as_view()), 
     path('download/<str:pk>', apiviews.SnippetDownload.as_view()), 
]

urlpatterns = format_suffix_patterns(urlpatterns)


