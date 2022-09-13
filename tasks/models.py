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
  created_at = models.DateTimeField(auto_now_add=True)
  owner = models.ForeignKey(   #one user many tasks
    'patients.Patient',
    related_name="tasks",
    on_delete = models.DO_NOTHING
  )
  assigned_carer = models.ForeignKey(   #one carer many tasks assigned
    'carers.Carer',
    related_name= 'assigned_tasks',
    on_delete=models.CASCADE,
    blank=True, 
    null=True,
  )
  possible_carers = models.ManyToManyField(  # many tasks proposed to many carers
    'carers.Carer',
    related_name='proposed_tasks',
    blank=True, 
    null=True,
  )
