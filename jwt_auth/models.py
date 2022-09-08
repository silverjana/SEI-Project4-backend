from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# Create your models here. 2 types of users -> user as Foreignkey to 2 models
class User(AbstractUser):
    email = models.CharField(max_length=100, unique=True)

    content_type =   models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object=GenericForeignKey('content_type', 'object_id')
    
