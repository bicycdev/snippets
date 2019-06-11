# Create your tests here.

# note mock should not be used here for any model calls
# only using it to test if slugify was called
import unittest
from unittest.mock import patch, Mock


from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.test import TestCase
from snippets.models import Snippet, Syntax

User = get_user_model()



class SnippetModelGoodDataTest(TestCase):
    # fixtures not recommend for tests generally
    # fixtures = ['syntax_list.json']

    # defaults
    def test_default_title(self):
        # Snippet() sets the default for all fields
        # even though there is no default snippet.text
        # this will not fail unless you call save or full_clean
        snippet = Snippet()
        self.assertEqual(snippet.title, 'Untitled')

    def test_default_author_is_none(self):
        snippet = Snippet()
        self.assertEqual(snippet.author, None)

    def test_default_views_is_0(self):
        snippet = Snippet()
        self.assertEqual(snippet.views, 0)

    def test_default_is_no_expiration(self):
        snippet = Snippet()
        self.assertEqual(snippet.expiration_date, None)

    def test_title_with_blank_is_not_default(self):
        snippet = Snippet(title='')
        self.assertEqual(snippet.title, '')

    # slugs
    def test_slug_is_automatically_generated(self):
        snippet = Snippet(title="My program is testing.")
        # will fail if .save() is not called since save adds a slug
        # and there is no default slug
        snippet.save()
        self.assertEqual(snippet.slug, "my-program-is-testing")

    def test_slug_is_correct_50_max_length(self):
        # instance is created and then save is implicity called
        # full_clean is not implicitly called
        snippet = Snippet.objects.create(title="This title is long. However, there are 50 more things.")
        self.assertEqual(snippet.slug, 'this-title-is-long-however-there-are-50-more')

    def test_slug_can_be_updated(self):
        snippet = Snippet(title="My slug is brand new")
        snippet.title = "My slug just changed"
        snippet.save()
        self.assertEqual(snippet.slug, 'my-slug-just-changed')

    # built in methods
    def test_snippetget_absolute_url(self):
        snippet = Snippet.objects.create(text="blah")
        self.assertEqual(snippet.get_absolute_url(), '/snippet/{}'.format(snippet.pk,))

    def test_snippetstring_representation(self):
        snippet = Snippet(title='some text')
        self.assertEqual(str(snippet), 'some text')

    def test_snippetdefault_ordering(self):
        snippet1 = Snippet.objects.create(title='last week', text='some text')
        snippet2 = Snippet.objects.create(title='yesterday', text='some text')
        snippet3 = Snippet.objects.create(title='today',  text='some text')
        self.assertEqual(
            list(Snippet.objects.all()),
            [snippet3, snippet2, snippet1]
        )

    # hello mock!
    def test_slugify_not_called_if_title_is_same(self):
        snippet = Snippet(title="My slug is brand new")
        snippet.save()
        with patch('snippets.models.slugify') as slugify_mock:
            slugify_mock.return_value = 'my-slug-is-changed'
            snippet.views = 0
            snippet.save()
        self.assertFalse(slugify_mock.called)
        # self.fail('implement this test')

    # hello mock!
    @patch('snippets.models.slugify')
    def test_slugify_called_when_title_changes(self, slugify_mock):
        snippet = Snippet(title="My slug is brand new")
        snippet.title = "My slug just changed"
        slugify_mock.return_value = 'my-slug-is-changed'
        snippet.save()
        slugify_mock.assert_called_once_with("My slug just changed")
        # self.fail('implement this test')


class SnippetModelBadDataTest(TestCase):

    def test_validation_visibilty_fails_with_wrong_input(self):
        # need to include text and slug because validation error
        # will be raised on those and we wouldn't know if its because of visibility
        snippet = Snippet(visibility='AS', text='nothing', slug='nothing')
        # fails django database validation, but error is not raised on database level
        # remember: snippet.save() does not auto call .full_clean
        with self.assertRaises(ValidationError):
            snippet.full_clean()

    def test_validation_url_hash_is_unique(self):
        # pk is url_hash
        # alternatively, we can place another assert
        snippet = Snippet(pk='12345678')
        # save does not call full_clean; the model does not seem to care that text is empty (full_clean would)
        # even though by default blank=False and null=False
        snippet.save()
        snippet2_ = Snippet(pk='12345678', text='nothing', slug='nothing')
        with self.assertRaises(ValidationError) as ve:
            snippet2_.full_clean()
        self.assertEqual(ve.exception.message_dict, {'url_hash': ['Snippet with this Url hash already exists.']})


class SyntaxModelGoodDataTest(TestCase):

    def test_default_ext(self):
        syntax_ = Syntax(name='python', mime_type='application/python')
        self.assertEqual(syntax_.ext, 'txt')

    def test_default_optgroup(self):
        syntax_ = Syntax(name='python', mime_type='application/python')
        self.assertEqual(syntax_.optgroup, 'ot')

    def test_syntax_string_representation(self):
        syntax_ = Syntax(name='python')
        self.assertEqual(str(syntax_), 'python')

    def test_syntax_default_ordering(self):
        # remember that plain text is automatically created
        syntax_default = Syntax.objects.get(name="Plain Text")
        syntax1 = Syntax.objects.create(name='python', mime_type='application/python')
        syntax2 = Syntax.objects.create(name='css', mime_type='application/css')
        syntax3 = Syntax.objects.create(name='html', mime_type='application/html')
        self.assertEqual(
            list(Syntax.objects.all()),
            [syntax2, syntax3, syntax_default, syntax1]
        )
