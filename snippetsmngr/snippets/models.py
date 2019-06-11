import random
import string
import uuid

from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone

from datetime import timedelta

from django.template.defaultfilters import slugify

from django.core.exceptions import ObjectDoesNotExist

import logging

logger = logging.getLogger(__name__)

# Create your models here.


def generate_hash():
    # generate random 8 length url hash that is not already in database
    while True:
        # url_hash = ''.join(random.sample(string.ascii_letters + string.digits, 8))
        # uuid_number = uuid.uuid4().hex[:8]
        # upper, lower = uuid_number[:6].upper(), uuid_number[-2:].lower()
        # letter chance is the same 1/2 = 1/4;
        # number chance is lower: 1/2 to 1/4;
        weighted_sample = (string.ascii_uppercase * 2
                           + string.ascii_lowercase + string.digits)
        url_hash = ''.join(random.sample(weighted_sample, 8))

        if not Snippet.objects.filter(url_hash=url_hash).exists():
            return url_hash

        # return url_hash


def get_syntax():
    # foreign key needs reference to id
    # initial data fixture loading is deprecated, next time migrations should be used for initial data
    # probably is a better way to ensure that the default syntax exists wihtout errors
    syntax_, created = Syntax.objects.get_or_create(name='Plain Text',
                                                    mime_type='text/plain', ext='txt')
    # should not happen
    if created:
        logger.info("created default syntax")

    return syntax_.id



class Syntax(models.Model):
    OPTGROUP_CHOICES = (
        ('cm', 'Common'),
        ('ot', 'Other'),
    )
    # null and blank default to False
    name = models.CharField(max_length=75, unique=True)
    mime_type = models.CharField(max_length=50)
    mode = models.CharField(max_length=25, default="null")
    ext = models.CharField(max_length=25, default="txt")
    # should be a separate model?
    optgroup = models.CharField(max_length=2, choices=OPTGROUP_CHOICES, default='ot')

    class Meta:
        verbose_name_plural = 'Syntaxes'
        ordering = ('name',)

    def __str__(self):
        return self.name



class PublicManager(models.Manager):
    # public, not expired or unlisted

    def get_queryset(self):
        # moved from seperate @staticmethod
        # note calling super for get_queryset
        # here get_queryset runs for every query so timezone.now() is correct
        return super(PublicManager, self).get_queryset().filter(
            visibility='PU').exclude(
            expiration_date__lte=timezone.now())


class Snippet(models.Model):
    url_hash = models.CharField(primary_key=True, max_length=8, unique=True,
                                default=generate_hash, editable=False)

    author = models.ForeignKey(User, null=True, blank=True, default=None, on_delete=models.CASCADE)
    # perhaps a bug in django?, but if title is blank,
    # the form will submit as blank and not untitled even when blank=false, not sure why?
    title = models.CharField('Snippet Name', max_length=200, default="Untitled")
    text = models.TextField(blank=False)
    # need to add verbose_name
    syntax = models.ForeignKey(Syntax, verbose_name='Snippet Syntax',
                               related_name='syntaxes', default=get_syntax, on_delete=models.CASCADE)
    views = models.PositiveIntegerField(default=0)
    # default max_length:50
    slug = models.SlugField()

    VISIBILITY_CHOICES = (
        ('PU', 'Public'),
        ('UN', 'Unlisted'),
        ('PR', 'Private'),
    )
    # models.CharField + choices = select widget in forms.py?
    visibility = models.CharField('Snippet Exposure', max_length=2,
                                  choices=VISIBILITY_CHOICES,
                                  default='PR')

    # be carefull, timezone.now() only runs when model.py is loaded
    # timezone.now is the correct one
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(default=timezone.now)
    # created_date = models.DateTimeField(auto_now_add=True)
    # updated_date = models.DateTimeField(auto_now=True)
    expiration_date = models.DateTimeField(null=True, blank=True, default=None)

    # manager override
    objects = models.Manager() # The default manager.
    public_objects = PublicManager() # The public non expired manager

    class Meta:
        ordering = ('-created_date',)

    def __str__(self):
        return self.title

    # returns the url for the specific bin
    def get_absolute_url(self):
        return reverse('snippets:detail', kwargs={'uuid_hash': self.url_hash})

    def save(self, *args, **kwargs):
        # self.pk is url_hash in bin
        # this method supports slug change if title is updated
        if not Snippet.objects.filter(pk=self.pk, title=self.title).exists():
            preslug = self.title
            # need check, otherwise preslug[:50] will catch even < 50 len
            if len(preslug) > 50:
                # need to slice because of default 50
                # rsplit splits off the last word; if title = one word, result is [:50]
                preslug = preslug[:50].rsplit(' ', 1)[0]
            self.slug = slugify(preslug)
        super(Snippet, self).save(*args, **kwargs)


