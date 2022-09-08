from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()   #returns auth_user_model specified in settings - dynamic

admin.site.register(User)