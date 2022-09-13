import imp
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from.models import Carer

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import CarerSerializer
#from .serializers.populated import CarerAllTaskSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class CarerView(APIView):
    
    #get all info about one carer
    def get_carer(self, pk):
        print('HIT GET CARER in CARERVIEW')
        try:
            return Carer.objects.get(pk=pk)
        except Carer.DoesNotExist:
            raise NotFound("carer not found")

    def get(self, _request, pk):
        carer = self.get_carer(pk=pk) # pass through get carer
        serialized_carer = CarerSerializer(carer)
        return Response(serialized_carer.data)       


class CarerListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  #get all carers fir list
  def get(self, _request):
      # first, we want to query the model Book
      carers = Carer.objects.all() # queryset with all rows
      
      serialized_books = CarerSerializer(carers, many=True) # many=True is always used when we're expecting multiple items in the response. So basically, whenever we use .all() we need to add many=True
      print(serialized_books)
      return Response(serialized_books.data, status=status.HTTP_200_OK)