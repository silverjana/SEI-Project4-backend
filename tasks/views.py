from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from carers.models import Carer

from jwt_auth.serializers.populated import UserPatientSerializer
from carers.serializers.common import CarerSerializer

from .models import Task
from carers.models import Carer

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
            raise NotFound("task not found!")

    def get(self, _request, pk):
        print('HIT GET TASK ')
        # either return task or raise a NotFound response
        task = self.get_task(pk=pk)
        serialized_task = TaskCarerSerializer(task)
        print(task)
        return Response(serialized_task.data)

    # delete a task
    def delete(self, request, pk):
        print('DELETE', pk)
        task_to_delete = self.get_task(pk)
        print('taskid:', pk)

        print("task owner id ->", task_to_delete.owner.id)

        print("request user object id ->", request.user.object_id)

        if task_to_delete.owner.id != request.user.object_id:
            raise PermissionDenied("Unauthorised")

        task_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  # cant send body

    def put(self, request, pk):
        # ! next thing to do - will not edit proposed tasks
        # # > b = Blog.objects.get(id=1) GET TASK from 'params'
        # task_to_update = self.get_task(pk=pk)

        # try:
        # # >>> e = Entry.objects.get(id=234) GET new task
        #     updated_task = request.data
        #     print(updated_task)
        #     # >>> b.entry_set.add(e) # Associates Entry e with Blog b.
        #     # task_to_update.add()

        #     return Response(updated_task.data, status=status.HTTP_202_ACCEPTED)
        # except Exception as e:
        #     print(e)
        #     return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


        task_to_update = self.get_task(pk)
        # when updating: pass both existing data and req data into the serializer
        updated_task = TaskSerializer(task_to_update, data=request.data)
        try:
            updated_task.is_valid(True)  # validate new data
            updated_task.save()  #  if valid, save
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

        request.data['owner'] = dict(serialized_user.data)[
            'content_object']['id']

        task_to_create = TaskSerializer(data=request.data)

        try:
            task_to_create.is_valid(True)

            task_to_create.save()
            # return status and Task
            return Response(task_to_create.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class TaskProposeView(APIView):
    permission_classes = (IsAuthenticated, )

    # get a task with id
    def get_task(self, pk):  # DRY looks for task and reports

        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise NotFound("task not found!")

    def put(self, request, pk):
        try:
            # > b = Blog.objects.get(id=1) GET TASK from 'params'
            task = self.get_task(pk=pk)
            print('task: ', task)
            # >>> e = Entry.objects.get(id=234) GET CARER ID from req
            print('request data:', request.data)
            print('request data id:', request.data.get('id'))
            carer = Carer.objects.get(pk=request.data.get('id'))
            print('carer:', carer)

            # >>> b.entry_set.add(e) # Associates Entry e with Blog b.
            task.possible_carers.add(carer)

            serialized_task = TaskSerializer(task)

            return Response(serialized_task.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class TaskAssignView(APIView):
    permission_classes = (IsAuthenticated, )

    # get a task with id
    def get_task(self, pk):  # DRY looks for task and reports
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise NotFound("task not found!")

    def put(self, request, pk):
        print('HITS ASSIGN PUT')
        try:
            # > b = Blog.objects.get(id=1) GET TASK
            task = self.get_task(pk=pk)
            print('task: ', task)
            print("request user object id ->", request.user.object_id)
            # print(request.data)
            serialized_task = TaskSerializer(
                task, {'assigned_carer': request.user.object_id, 'possible_carers': []}, partial=True)
            serialized_task.is_valid(True)
            serialized_task.save()

            print('ser.task data:', serialized_task.data)

            return Response(serialized_task.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
