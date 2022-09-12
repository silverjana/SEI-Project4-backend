from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status

#dynamic user
from django.contrib.auth import get_user_model
User = get_user_model() 

from patients.serializers.common import PatientSerializer
from carers.serializers.common import CarerSerializer

import jwt
from datetime import datetime, timedelta # datetime : get now as a date. timedelta: period of time as a num value. together:expiry date
from django.conf import settings #import settings as var - SECRET_KEY

from .serializers.common import UserSerializer

from rest_framework.permissions import IsAuthenticated
from jwt_auth.serializers.populated import UserPatientSerializer, UserCarerSerializer

class RegisterView(APIView):
    
  def post(self, request, type): #tipe from url - /int:type 
    print('HITS register/POST')
    print(request.data)
    # to save user we need content_type and  object_id 
    # content type is in variable in url - just add propety to user ( that has pw etc)
    # for object_id we need to serialize the patient/carer part, save to db ->  get id, add property to user
    # THEN serialize user

    try:
      #print('type: ', type)
      
      user = dict(request.data)  # is dict with req data
      print('got meta from req data')
      meta = user.pop("meta")
      print('USER after pop' , user)

      user['content_type'] = type # add content_type property to user
      print('added content-type to user')
      print(meta)
      print(user)

      #serialize as patient or carer

      if type == 7:
        serialized_meta = PatientSerializer(data = meta)
      elif type == 8:
        serialized_meta = CarerSerializer(data = meta)
      else: 
        raise KeyError('invalid type')

      print('meta serialized ok ')


      #validate 
      serialized_meta.is_valid(True) # check 
      print('serialized meta is valid' , serialized_meta)

      saved_meta = serialized_meta.save()  #save in db - 
      print('saved meta - has id')

      user['object_id'] = saved_meta.id  # save object_id to user
      print('object Id saved')
      print('USER ->' , user)
      ######### serialize user

      user_to_create = UserSerializer(data=user)

    
      user_to_create.is_valid(True) # pass request through the validate method in the serializer. If succeeds,adds the validated_data key to the user_to_create object
      print('Validated data',user_to_create.validated_data)
      user_to_create.save() # save() then uses validated_data object to create a new user. Once successful, it will add a data key to user_to_create, which we can then send back to the user
      return Response(user_to_create.data, status=status.HTTP_202_ACCEPTED)

    except Exception as e:
      print('error in registerview/post', e )
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  
class LoginView(APIView):

    # 1. check that email on request.data matches a User record
    # 2. does the plain text password on request.data match the hashes password stored in the database?
    # 3. If user is validated -> send back a token
    # 4. If not validated -> PermissionDenied response 

  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')

    #1
    try:
      user_to_login = User.objects.get(email=email)
    except User.DoesNotExist:
      print("FAILED AT EMAIL STAGE")
      raise PermissionDenied("Invalid credentials") #4

    #2
    if not user_to_login.check_password(password):  #if don't match -> error
      print("FAILED AT PASSWORD STAGE")
      raise PermissionDenied("Invalid credentials") #4  
    
    #3
    dt = datetime.now() + timedelta(days=7) # dt will be a timestamp 7 days from now

    token = jwt.encode(
      # 1st argument: payload
      {
        "sub": user_to_login.id,
        "exp": int(dt.strftime('%s'))    # dt time transformed in seconds and then integer
      },
      #2nd argument: secret -> settings var
      settings.SECRET_KEY,
      #3rd arg: algorythm (default one)
      "HS256"
    )
    print("TOKEN IS HERE ->", token)

    return Response({ "token": token, "message": f"Welcome back {user_to_login.username}" 
  })

class ProfileView(APIView):
  permission_classes = (IsAuthenticated, )

  def get(self, request):
    print(request.user)
    print(request.user.content_type)
    if "carer" in str(request.user.content_type):
      serialized_user = UserCarerSerializer(request.user)
    else:
      serialized_user = UserPatientSerializer(request.user)

    return Response(serialized_user.data)
  #get user making the req
