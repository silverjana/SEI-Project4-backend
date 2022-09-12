from rest_framework import serializers
from ..models import Carer


class CarerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carer
        fields = "__all__"

