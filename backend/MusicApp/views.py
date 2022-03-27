from django.shortcuts import render
from rest_framework import viewsets # We use a viewset.
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core import serializers

from .forms import Registration_form, Retrieval_form
from .models import User, Artist, Rating, Attribute

from .serializers import UserSerializer, AttributeSerializer, ArtistSerializer, RatingSerializer

#Change our views from PS2 to use the serializer class

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    #authentication_classes = (TokenAuthentication, )

class ArtistViewSet(viewsets.ModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()

class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()

class AttributeViewSet(viewsets.ModelViewSet):
    serializer_class = AttributeSerializer
    queryset = Attribute.objects.all()

