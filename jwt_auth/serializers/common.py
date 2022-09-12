# we want auth to happen inside of serializer, not views

from django.contrib.auth.hashers import make_password
# sends validation error to user
from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    # do not sent pw back at any point when querying:
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    # validate method is executed when is_valid is executed on the serializer
    # 1. Check password matches password_conf
    # 2. check the password meets the minimum standard / strong password
    # 3. hash the password to be stored in database

    def validate(self, data):

      # remove pws and save in var
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        # 1
        if password != password_confirmation:  # if dont match -> error, else next
            raise ValidationError({
                "password_confirmation": "Does not match password"  # where: what error
            })

        # 2
        # password_validation.validate_password(password)  #def django validator

        # 3
        # hashes pw and puts back in data
        data['password'] = make_password(password)

        return data

    class Meta:
        model = User
        fields = ('id', 'email', 'password',
                  'password_confirmation', 'username', 'object_id', 'content_type')
