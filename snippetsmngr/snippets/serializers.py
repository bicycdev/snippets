from rest_framework import serializers
from snippets.models import Snippet, Syntax

from django.template.defaultfilters import slugify


class SnippetSerializer(serializers.ModelSerializer):

    # we tell the validator that slug is not required,
    # and we let models.py create the slug
    slug = serializers.SlugField(required=False)
    syntax_name = serializers.ReadOnlyField(source='syntax.name')
    syntax_mode = serializers.ReadOnlyField(source='syntax.mode')
    syntax_ext = serializers.ReadOnlyField(source='syntax.ext')
    syntax_mime_type = serializers.ReadOnlyField(source='syntax.mime_type')
    visibility_display = serializers.ReadOnlyField(source='get_visibility_display')
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Snippet
        fields = ('url_hash', 'author', 'author_name', 'title', 'text', 'syntax','syntax_name', 'syntax_mode', 'syntax_ext', 'syntax_mime_type', 'views', 'slug', 
        'visibility', 'created_date', 'updated_date', 'expiration_date', 'visibility_display')
        extra_kwargs = {'author': {'write_only': True}}

class SyntaxSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Syntax

        fields = ('id', 'name', 'mime_type', 'mode', 'ext', 'optgroup')