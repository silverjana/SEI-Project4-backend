from .common import PatientSerializer
#from tasks.serializers.common import TaskSerializer
from tasks.serializers.populated import TaskCarerSerializer
from carers.serializers.common import CarerSerializer



# patient populated with all their tasks
class PatientTaskSerializer(PatientSerializer):
    tasks = TaskCarerSerializer(many=True)
    #possible_carers = CarerSerializer(many=True)



