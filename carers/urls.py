from django.urls import path
from.views import CarerListView, CarerView

urlpatterns = [
  path('<int:pk>/', CarerView.as_view()),
  path('', CarerListView.as_view())
]