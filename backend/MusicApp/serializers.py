from rest_framework import serializers
from .models import User, Attribute, Artist, Rating

#Serializers convert Django model instances to Python dictionaries, which can then be rendered
#might have to add id for each Serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ['artist_name', 'album', "genre", "year", "record_company"]

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['song', 'artist', 'average_rating']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['username', 'song', 'rating']