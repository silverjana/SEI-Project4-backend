from rest_framework import serializers
from ..models import Task

from carers.serializers.common import CarerSerializer

class TaskCarerSerializer(serializers.ModelSerializer): #task with possible carers
  carers = CarerSerializer  # all carer data included
