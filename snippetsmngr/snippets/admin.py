from django.contrib import admin

# Register your models here.
from .models import Snippet, Syntax


class SnippetAdmin(admin.ModelAdmin):
    list_display = ('title', 'text', 'created_date',
                    'url_hash', 'get_absolute_url')
    prepopulated_fields = {'slug': ("title",)}


admin.site.register(Snippet, SnippetAdmin)
admin.site.register(Syntax)
