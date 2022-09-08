# we want auth to happen inside of serializer, not views

from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation

User = get_user_model()

from rest_framework.exceptions import ValidationError # sends canned response to user for validation error

from django.contrib.auth.hashers import make_password 

class UserSerializer(serializers.ModelSerializer):

  #do not sent pw back at any point when querying:
  password=serializers.CharField(write_only=True)
  password_confirmation=serializers.CharField(write_only=True)

  # validate method is executed when is_valid is executed on the serializer
    # 1. Check password matches password_conf
    # 2. check the password meets the minimum standard / strong password
    # 3. hash the password to be stored in database

  def validate(self, data):
    
    #remove pws and save in var
    password = data.pop('password')
    password_confirmation = data.pop('password_confirmation')

    #1
    if password != password_confirmation:     #if dont match -> error, else next
      raise ValidationError({
        "password_confirmation": "Does not match password"   #where: what error
      })

    #2 
    password_validation.validate_password(password)  #def django validator

    #3
    data['password'] = make_password(password) #hashes pw and puts back in data

    return data

  class Meta:
    model=User
    fields=('id', 'email', 'password', 'password_confirmation')
