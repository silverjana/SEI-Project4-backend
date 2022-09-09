#req hits this point when view is looking for authenticate method

from rest_framework.authentication import BasicAuthentication # class to extend to create an authenticate method for our custom authentication
from rest_framework.exceptions import PermissionDenied # nope
from django.contrib.auth import get_user_model
from django.conf import settings # SECRET_KEY from settings
import jwt

User = get_user_model()

# custom auth class
class JWTAuthentication(BasicAuthentication):

  def authenticate(self, request):
    #1. check Authorization header exists (ok->next)
    print("HITS AUTHENTICATE MIDDLEWARE")
    header = request.headers.get('Authorization') #get
    if not header:
      return None     #any req hits this and returns this if not auth. if no auth needed, everything continues normally

    #2. check header is valid - Is a bearer token) (ok->next)
    if not header.startswith('Bearer'):
      print("FAILED AT TOKEN SYNTAX")
      raise PermissionDenied("Invalid Token")

    #3. remove the Bearer from the beginning, and save just the token to a variable
    token = header.replace('Bearer ', '') #replace bearer_ with empty string

    try:
      # 4. Attempt to decode the token
      # - first argument is the token - second argument is the secret- third argument is the algorithm used to decode (default)
      
      payload = jwt.decode(token, settings.SECRET_KEY, ["HS256"])

      # 5. If decoded, we should have a sub - that sub is the user id and we'll use this to look for a user matching that id in the db
      user = User.objects.get(pk=payload.get('sub'))
        
        # exception thrown if the token fails to be decoded:
    except jwt.exceptions.InvalidTokenError:
      print("FAILED AT TOKEN DECODE")
      raise PermissionDenied("Invalid Token")

        # Exception thrown if the User is not found
    except User.DoesNotExist:
        print("FAILED AT USER LOOKUP")
        raise PermissionDenied("User not found")

    # 6. If user is verified, authenticate method requires us to return a tuple (user, token)
    return (user, token)

