from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from jwt_auth.serializers.populated import UserPatientSerializer

from .models import Task
from .serializers.common import TaskSerializer
from .serializers.populated import TaskCarerSerializer

# Create your views here.


class TaskDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    # get a task with id
    def get_task(self, pk):  # DRY looks for task and reports

        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise NotFound("Review not found!")

    def get(self, _request, pk):
        print('HIT GET TASK ')
        # either return task or raise a NotFound response
        task = self.get_task(pk=pk)
        serialized_task = TaskCarerSerializer(task)
        print(task)
        return Response(serialized_task.data)

    # delete a task
    def delete(self, request, pk):
        task_to_delete = self.get_task(pk)
        print('taskid:', pk)
        print("task owner id ->", task_to_delete.owner)
        print("request user id ->", request.user)

        if task_to_delete.owner != request.user:
            raise PermissionDenied("Unauthorised")

        task_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) #cant send body


    def add(self, request, pk):
      # > b = Blog.objects.get(id=1) GET TASK
      task = self.get_task(pk=pk)
      # >>> e = Entry.objects.get(id=234) GET CARER ID from request?
      print('request:', request)
      # >>> b.entry_set.add(e) # Associates Entry e with Blog b.



    def put(self, request, pk):
        task_to_update = self.get_task(pk) 
        updated_task = TaskCarerSerializer(task_to_update, data=request.data) # when updating: pass both existing data and req data into the serializer
        try:
            updated_task.is_valid(True) #validate new data
            updated_task.save() # if valid, save 
            return Response(updated_task.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class TaskListView(APIView):
    permission_classes = (IsAuthenticated, )

    # post a review
    def post(self, request):
        # posting-> no request to the db
        print(request.data)

        serialized_user = UserPatientSerializer(request.user)
        
        request.data['owner'] = dict(serialized_user.data)['content_object']['id']

        task_to_create = TaskSerializer(data=request.data)

        try:
            task_to_create.is_valid(True)

            task_to_create.save()
            # return status and Task
            return Response(task_to_create.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
