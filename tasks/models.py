from django.db import models

class Status(models.TextChoices):
  new = 'new'
  assigned = 'assigned'
  closed = 'closed'


class Task(models.Model):
  description = models.TextField(max_length=350)
  start_date = models.CharField(max_length=25)
  frequency = models.CharField(max_length=50)
  treatment = models.CharField( max_length=50)
  status = models.CharField(Status.choices, max_length=10)
  owner = models.ForeignKey(   #one user many tasks
    'jwt_auth.User',
    related_name="tasks",
    on_delete = models.DO_NOTHING
  )
  assigned_carer = models.ForeignKey(   #one carer many tasks assigned
    'carers.Carer',
    related_name= 'assigned_tasks',
    on_delete=models.CASCADE
  )
  possible_carers = models.ManyToManyField(  # many tasks proposed to many carers
    'carers.Carer',
    related_name='proposed_tasks'
  )
