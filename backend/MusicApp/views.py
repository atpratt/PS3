from django.shortcuts import render
from rest_framework import viewsets # We use a viewset.
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core import serializers

from .forms import Registration_form, Retrieval_form
from .models import User, Artist, Rating, Attribute

from .serializers import UserSerializer, AttributeSerializer, ArtistSerializer, RatingSerializer

#Change our views from PS2 to use the serializer class


@csrf_exempt
def index(request):
	reg_form = Registration_form
	ret_form = Retrieval_form
	context = {'reg_form': reg_form, 'ret_form': ret_form}
	return render(request, 'MusicApp/index.html', context)


@csrf_exempt
def user_registration(request):
	if request.method == 'POST':
		password = request.POST.get("password");
		username = request.POST.get("username");
		
        #check if the username already exists
		try:
			user = User.objects.get(username = username)
		except User.DoesNotExist:
			user = None

        #if username doesn't exist and nothing left blank
		if(user == None and username != "" and password != ""):
			new_User = User(username = username, password = password)
			new_User.save()
		else:
			return HttpResponse("We'll need both a username and password!");
	else:
		return HttpResponse("That username is already taken!");

	return HttpResponse("success");

@csrf_exempt
def rate(request):
	if(request.method == 'POST'):
		username = request.POST.get("username");
		title = request.POST.get("title");
		rating = request.POST.get("rating");
		artistname = request.POST.get("artistname");

		user = None;

		try:
			user = User.objects.get(username=username);
		except User.DoesNotExist:
			return HttpResponse("Failure: User nonexistant!")
		
		#Get the artist for the song, create if nonexistant
		try:
			song = Artist.objects.get(song = title, artist=artistname);
		except Artist.DoesNotExist:
			try:
				artist = Attribute.objects.get(name = artistname);
			except Attribute.DoesNotExist:
				artist = Attribute(name = artistname, album = "", genre = "", year = 0, record_company = "");
				artist.save();
			song = Artist(song = title, artist = artist);
			song.save();
		#Try and get the rating for that user and that song, return error if it exists
		try:
			rating = Rating.objects.get(username=User.objects.get(username=username),song=Artist.objects.get(song=title, artist=Attribute.objects.get(name = artistname)));
			if(rating != None):
				return HttpResponse("Failure: Already rated by this user!");
		except Rating.DoesNotExist:
			rating = Rating(username=User.objects.get(username=username),song=Artist.objects.get(song=title),rating=rating);
			rating.save();
			return HttpResponse("Rating success!");

def average_rating(title):
		ratings = Rating.objects.filter(song = title);
		totalrating = 0;
		if(ratings.count() == 0):
			return 0;
		for rating in ratings:
			totalrating += rating.rating;
		return totalrating / ratings.count();

@csrf_exempt
def song_retrieval(request):
	reg_form = Registration_form
	ret_form = Retrieval_form
	if request.method == 'POST':
		form = Retrieval_form(request.POST)
		if form.is_valid():
			ratings = Rating.objects.get()
			context = {'reg_form': reg_form, 'ret_form': ret_form}

	else:
		context = {'reg_form': reg_form, 'ret_form': ret_form}

	return render(request, 'MusicApp/index.html', context)

@csrf_exempt
def list_songs(request):
	if(request.method == 'GET'):
		all = Artist.objects.all();
		for s in all:
			s.average_rating = averagerating(s.song);
		all_json = serializers.serialize('json', all);
		return HttpResponse(all_json, content_type='application/json')

@csrf_exempt
def artist_retrieval(request):
	reg_form = Registration_form
	ret_form = Retrieval_form
	if request.method == 'POST':
		form = Retrieval_form(request.POST)
		if form.is_valid():
			pass

	else:
		pass

	context = {'reg_form': reg_form, 'ret_form': ret_form}
	return render(request, 'MusicApp/index.html', context)


@csrf_exempt
def delete_song(request):
	if(request.method == 'POST'):
		title = request.POST.get("song");
		Rating.objects.filter(song = title).delete();
		Artist.objects.filter(song = title).delete();
		return HttpResponse("Song succesfully deleted!");

# class UserViewSet(viewsets.ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()
#     #authentication_classes = (TokenAuthentication, )

# class ArtistViewSet(viewsets.ModelViewSet):
#     serializer_class = ArtistSerializer
#     queryset = Artist.objects.all()

# class RatingViewSet(viewsets.ModelViewSet):
#     serializer_class = RatingSerializer
#     queryset = Rating.objects.all()

# class AttributeViewSet(viewsets.ModelViewSet):
#     serializer_class = AttributeSerializer
#     queryset = Attribute.objects.all()

