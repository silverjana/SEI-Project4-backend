import imp
from .common import CarerSerializer
from tasks.serializers.common import TaskSerializer  


class CarerAllTaskSerializer(): #carer with possible tasks and assigned tasks
  proposed_tasks = TaskSerializer(many=True)
  assigned_tasks = TaskSerializer(many=True)


  