from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from.models import Carer

# Create your views here.
class CarerView(APIView):
    
    #get all info about one carer
    def get_carer(self, pk):
        try:
            return Carer.objects.get(pk=pk)
        except Carer.DoesNotExist:
            raise NotFound("carer not found!")
