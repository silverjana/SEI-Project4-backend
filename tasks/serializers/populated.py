from rest_framework import serializers
from ..models import Task
from .common import TaskSerializer

from carers.serializers.common import CarerSerializer
from patients.serializers.common import PatientSerializer


class TaskCarerSerializer(TaskSerializer):  # task with possible carers
    # all possible carer data included
    possible_carers = CarerSerializer(many=True)
    assigned_carer = CarerSerializer()  # ! add assigned carer?
