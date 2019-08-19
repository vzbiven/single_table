# Create your views here.

from single_table_app.models import Emoji
from single_table_app.serializers import EmojiSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
from django.core.paginator import Paginator


#main view for table
@ensure_csrf_cookie
def index(request):
    return render(request, 'single_table_app/index.html')


#CRUD class view
class EmojiEdit(APIView):

    #getting object from db
    def get_object(self, id):
        try:
            return Emoji.objects.get(id=id)
        except Emoji.DoesNotExist:
            raise Http404

    #working with GET request, sending data with pagination
    def get(self, request, format=None):
        emojis_list = Emoji.objects.all()
        paginator = Paginator(emojis_list, 25)
        all_pages = paginator.count
        page = request.GET.get('page')
        emojis = paginator.page(page)
        serializer = EmojiSerializer(emojis, many=True)
        out = {'total': str(all_pages), 'data': serializer.data}
        return Response(out)

    #working with POST request
    def post(self, request, format=None):
        serializer = EmojiSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Working with PUT request
    def put(self, request, id, format=None):
        emoji = self.get_object(id)
        # !!!
        serializer = EmojiSerializer(emoji, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    #working with DELETE request, deleted data are stored in db with flag 'DELETED'
    def delete(self, request, id, format=None):
        emoji = self.get_object(id)
        emoji.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)