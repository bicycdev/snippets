
# Create your tests here.

from unittest.mock import Mock, patch
import unittest

from django.http import HttpRequest
from django.template.loader import render_to_string
from django.test import TestCase
from django.utils.html import escape

from snippets.models import Snippet, Syntax


from django.contrib.auth import get_user_model
User = get_user_model()




class HomePageTest(TestCase):
    def test_home_page_renders_home_template(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'snippets/home.html') 
