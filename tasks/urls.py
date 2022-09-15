from django.urls import path
from.views import TaskDetailView, TaskListView, TaskAssignView, TaskProposeView

urlpatterns = [
  path('<int:pk>/', TaskDetailView.as_view()),
  path('', TaskListView.as_view()),
  path('assign/<int:pk>/', TaskAssignView.as_view()),
  path('propose/<int:pk>/', TaskProposeView.as_view()),

]