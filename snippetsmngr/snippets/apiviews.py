import random
from datetime import timedelta

from django.shortcuts import render, redirect, get_object_or_404
from django.http import Http404, HttpResponse
from django.utils import timezone
from django.contrib.auth.decorators import login_required


from .models import Snippet, Syntax

from django.contrib import messages
from django.contrib.auth.models import User

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


import logging
logger = logging.getLogger(__name__)

# rest-api
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer, SyntaxSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, filters, generics



# rest-api views


class TrendsList(APIView):
    """
    Get trends. 
    """
    def get(self, request, time_period, format=None):
        valid_periods = {'now': 3,
                     'week': 7,
                     'month': 30
                     }
        valid_sort = {'date': 'created_date', 
                    'views': 'views',
                    'title': 'title',
                    'language': 'syntax_name',}
        valid_order = {'asc': False, 
                        'desc': True,}
        # print('This %s' % (time_period))
        if time_period == 'alltime':
            #bin_list = get_trends_list()
            pass
        elif time_period in valid_periods:
            delta_days = valid_periods.get(time_period)
            gte_delta = timezone.now() - timedelta(days=delta_days)
            snippets = Snippet.public_objects.filter(created_date__gte=gte_delta)
            snippets = snippets.order_by('-views')[:5]
            try:
                sort_query = self.request.query_params.get('sort', 'views.desc')
                sort_value, sort_order = sort_query.split('.')
            except ValueError:
                print('VAlueError: there are too many values or two little values to unpack')
                raise Http404
            try:
                sort_value = valid_sort.get(sort_value, None)  
                sort_order = valid_order.get(sort_order, None)  
                serializer = SnippetSerializer(snippets, many=True)
                 # slicing retrieves from database, to reorder it we use sorted, reverse = True means desc
                sorted_serializer_data = sorted(serializer.data, key=lambda abin: abin[sort_value], reverse=sort_order)
                return Response(sorted_serializer_data)
            except TypeError:
                print('TypeError: sort_value or sort_order is null')
                raise Http404  
        raise Http404



class SyntaxList(APIView):
    """
    List all syntaxes.
    """
    def get(self, request, format=None):
        snippets = Syntax.objects.all()
        serializer = SyntaxSerializer(snippets, many=True)
        return Response(serializer.data)


class SnippetList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SnippetSerializer(data=request.data)
        # for dev purposes randomize views
        views = random.randint(20,120)
        if serializer.is_valid():
            if request.user.is_authenticated:
                serializer.save(author=request.user, views=views)
            else:
                serializer.save(views=views)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SnippetDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Snippet.objects.get(pk=pk)
        except Snippet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)

        if (snippet.visibility == 'PR') and (request.user != snippet.author):
            print('HTTP_401_UNAUTHORIZED page hit')
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = SnippetSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SnippetSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SnippetRaw(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Snippet.objects.get(pk=pk)
        except Snippet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SnippetSerializer(snippet)
        print(serializer.data)
        content = serializer.data.get('text')
        return Response(data=content, content_type='text/plain; charset=utf-8')

class SnippetDownload(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Snippet.objects.get(pk=pk)
        except Snippet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SnippetSerializer(snippet)
        url_hash, slug, syntax = serializer.data.get('url_hash'), serializer.data.get('slug'), serializer.data.get('syntax_ext')
        filename = "{}_{}.{}".format(url_hash, slug, syntax)
        mime_type, content = serializer.data.get('syntax_mime_type'), serializer.data.get('text')
        response = Response(data=content, content_type=mime_type)
        response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
        return response