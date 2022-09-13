from rest_framework import serializers
from .common import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

from patients.serializers.common import PatientSerializer
from carers.serializers.common import CarerSerializer

class UserPatientSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)
  content_object = PatientSerializer()

  class Meta:
    model = User
    fields = '__all__'

class UserCarerSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)
  content_object = CarerSerializer()

  class Meta:
    model = User
    fields = '__all__'


