from .common import PatientSerializer 
from tasks.serializers.common import TaskSerializer    

class PatientTaskSerializer(PatientSerializer): # patient populated with all their tasks
  tasks = TaskSerializer(many=True)
