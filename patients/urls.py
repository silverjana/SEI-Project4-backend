from django.urls import path
from.views import PatientView

urlpatterns = [
  path('<int:pk>/', PatientView.as_view())
]