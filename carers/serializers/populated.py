
from .common import CarerSerializer
from tasks.serializers.common import TaskSerializer  


class CarerAllTaskSerializer(CarerSerializer): #carer with possible tasks and assigned tasks
  proposed_tasks = TaskSerializer(many=True)
  assigned_tasks = TaskSerializer(many=True)


  