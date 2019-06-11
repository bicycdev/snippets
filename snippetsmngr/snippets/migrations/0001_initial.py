# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import snippets.models
import django.utils.timezone


class Migration(migrations.Migration):
    # required for user dependancy
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Snippet',
            fields=[
                ('url_hash', models.CharField(editable=False, default=snippets.models.generate_hash, max_length=8, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=200, default='Untitled')),
                ('text', models.TextField()),
                ('views', models.PositiveIntegerField(default=0)),
                ('slug', models.SlugField()),
                ('visibility', models.CharField(max_length=2, verbose_name='Snippet Exposure', choices=[('PU', 'Public'), ('UN', 'Unlisted'), ('PR', 'Private')], default='PR')),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('expiration_date', models.DateTimeField(null=True, default=None, blank=True)),
                ('author', models.ForeignKey(default=None, to=settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.CASCADE)),
            ],
        ),
        migrations.CreateModel(
            name='Syntax',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=75, unique=True)),
                ('mime_type', models.CharField(max_length=50)),
                ('mode', models.CharField(max_length=25, default='null')),
                ('ext', models.CharField(max_length=25, default='txt')),
                ('optgroup', models.CharField(max_length=2, choices=[('cm', 'Common'), ('ot', 'Other')], default='ot')),
            ],
        ),
        migrations.AddField(
            model_name='snippet',
            name='syntax',
            field=models.ForeignKey(verbose_name='Snippet Syntax',  on_delete=models.CASCADE, default=snippets.models.get_syntax, to='snippets.Syntax', related_name='syntaxes'),
        ),
    ]
