from asyncio import tasks
from django.db import models

from jwt_auth.models import User

from django.contrib.contenttypes.fields import GenericRelation
# Create your models here.
class Carer(models.Model):
  name = models.CharField(max_length=50)
  qualification = models.CharField(max_length=50)
  specialization = models.CharField(max_length=70)
  image = models.CharField(max_length=500, null=True, blank=True)
  bio = models.CharField(max_length=500, null=True, blank=True)
  education = models.CharField(max_length=150, null=True, blank=True)
  location = models.CharField(max_length=300)
  is_medic = models.BooleanField(default=True)
  user = GenericRelation(User)
  

  def __str__(self):
    return f"{self.name} - {self.qualification}"