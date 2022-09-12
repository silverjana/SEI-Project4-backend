from django.urls import path
from.views import CarerView

urlpatterns = [
  path('<int:pk>/', CarerView.as_view())
]