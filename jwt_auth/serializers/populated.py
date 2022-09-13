from rest_framework import serializers
from .common import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

#from patients.serializers.common import PatientSerializer
#from carers.serializers.common import CarerSerializer
from patients.serializers.populated import PatientTaskSerializer
from carers.serializers.populated import CarerAllTaskSerializer


class UserPatientSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)
  content_object = PatientTaskSerializer()

  class Meta:
    model = User
    fields = '__all__'

class UserCarerSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)
  content_object = CarerAllTaskSerializer()

  class Meta:
    model = User
    fields = '__all__'


