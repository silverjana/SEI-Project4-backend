from django.urls import path
from .views import RegisterView, LoginView, ProfileView

urlpatterns = [
    path('register/<int:type>/', RegisterView.as_view()),   #type to get from front end as number = id of model ( patient/caregiver) #
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
]