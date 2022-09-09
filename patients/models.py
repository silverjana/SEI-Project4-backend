from django.db import models

from jwt_auth.models import User

from django.contrib.contenttypes.fields import GenericRelation

# https://docs.djangoproject.com/en/dev/ref/models/fields/#field-choices-enum-types
#Note that using YearInSchool.SENIOR, YearInSchool['SENIOR'], or YearInSchool('SR') to access or lookup enum members work as expected, /SENIOR = 'SR',

class Gender(models.TextChoices):
  female = 'female'
  male = 'male'
  prefer_not = 'prefer not to say'


# Create your models here.
class Patient(models.Model):
  name= models.CharField(max_length=50)
  date_of_birth = models.DateTimeField
  gender = models.CharField(Gender.choices , max_length=50 )
  health_status = models.TextField(null=True)
  allergies = models.TextField(null=True)
  contact = models.CharField(max_length=10, null=True)
  emergency_contact = models.CharField(max_length=100, null=True)
  em_contact_relationship = models.CharField(max_length=150, null=True)
  location = models.CharField(max_length=300)
  user = GenericRelation(User)

  def __str__(self):
    return f"{self.name}"