from rest_framework import serializers
from ..models import Task
from .common import TaskSerializer

from carers.serializers.common import CarerSerializer

class TaskCarerSerializer(TaskSerializer): #task with possible carers
  possible_carers = CarerSerializer(many=True)  # all carer data included
  assigned_carer = CarerSerializer #! add assigned carer?
