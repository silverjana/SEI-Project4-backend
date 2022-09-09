from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from.models import Patient

# Create your views here.
class PatientView(APIView):
    
    #get all info about one patient
    def get_patient(self, pk):
        try:
            return Patient.objects.get(pk=pk)
        except Patient.DoesNotExist:
            raise NotFound("Review not found!")

