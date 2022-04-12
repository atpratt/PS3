from django.shortcuts import render
from rest_framework import viewsets # We use a viewset.
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core import serializers

from .forms import Registration_form, Retrieval_form
from .models import User, Artist, Rating, Attribute

from .serializers import UserSerializer, AttributeSerializer, ArtistSerializer, RatingSerializer

#Change our views from PS2 to use the serializer class


# @csrf_exempt
# def index(request):
# 	reg_form = Registration_form
# 	ret_form = Retrieval_form
# 	context = {'reg_form': reg_form, 'ret_form': ret_form}
# 	return render(request, 'MusicApp/index.html', context)


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
			new = User(username = username, password = password)
			new.save()
		else:
			return HttpResponse("We'll need both a username and password!");
	else:
		return HttpResponse("That username is already taken!");

	return HttpResponse("Successfully registered new user!");

# @csrf_exempt
# def rate(request):
# 	if(request.method == 'POST'):
# 		username = request.POST.get("username");
# 		artistname = request.POST.get("artistname");
# 		title = request.POST.get("title");
# 		rating = request.POST.get("rating");
		

# 		user = None;

# 		#check if valid username
# 		try:
# 			user = User.objects.get(username = username);
# 		except User.DoesNotExist:
# 			return HttpResponse("That username doesn't exist yet!")
		
# 		#Check if song exists, otherwise add to database
# 		try:
# 			song = Artist.objects.get(song = title, artist = artistname);
# 		except Artist.DoesNotExist:
# 			try:
# 				artist = Attribute.objects.get(name = artistname);
# 			except Attribute.DoesNotExist:
# 				artist = Attribute(name = artistname, album = "", genre = "", year = 0, record_company = "");
# 				artist.save();
# 			song = Artist(song = title, artist = artist);
# 			song.save();
		
# 		#Check if user has rated that song yet
# 		try:
# 			rating = Rating.objects.get(username = User.objects.get(username = username),song = Artist.objects.get(song = title, artist = Attribute.objects.get(name = artistname)));
# 			if(rating != None):
# 				return HttpResponse("That user has already rated this song!");
# 		except Rating.DoesNotExist:
# 			rating = Rating(username = User.objects.get(username = username),song = Artist.objects.get(song = title),rating = rating);
# 			rating.save();
# 			return HttpResponse("Rating has been added to the database!");

# def average_rating(title):
# 		ratings = Rating.objects.filter(song = title);
# 		total = 0;
# 		count = ratings.count()
# 		if(count == 0):
# 			return 0;
# 		for rating in ratings:
# 			total += rating.rating;
# 		return total / count;

# @csrf_exempt
# def song_retrieval(request):
# 	reg_form = Registration_form
# 	ret_form = Retrieval_form
# 	if request.method == 'POST':
# 		form = Retrieval_form(request.POST)
# 		if form.is_valid():
# 			ratings = Rating.objects.get()
# 			context = {'reg_form': reg_form, 'ret_form': ret_form}

# 	else:
# 		context = {'reg_form': reg_form, 'ret_form': ret_form}

# 	return render(request, 'MusicApp/index.html', context)

# @csrf_exempt
# def list_songs(request):
# 	if(request.method == 'GET'):
# 		all = Artist.objects.all();
# 		for s in all:
# 			s.average_rating = averagerating(s.song);
# 		all_json = serializers.serialize('json', all);
# 		return HttpResponse(all_json, content_type='application/json')

# @csrf_exempt
# def artist_retrieval(request):
# 	reg_form = Registration_form
# 	ret_form = Retrieval_form
# 	if request.method == 'POST':
# 		form = Retrieval_form(request.POST)
# 		if form.is_valid():
# 			pass

# 	else:
# 		pass

# 	context = {'reg_form': reg_form, 'ret_form': ret_form}
# 	return render(request, 'MusicApp/index.html', context)


# @csrf_exempt
# def delete_song(request):
# 	if(request.method == 'POST'):
# 		title = request.POST.get("song");
# 		Rating.objects.filter(song = title).delete();
# 		Artist.objects.filter(song = title).delete();
# 		return HttpResponse("Song succesfully deleted!");

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

def averagerating(song):
		ratings = Rating.objects.filter(song=song);
		total = 0;
		if(ratings.count() == 0):
			return 0;
		for rating in ratings:
			total += rating.rating;
		return total/ratings.count();

def getsongs(request):
	if(request.method == 'GET'):
		queryset = Artist.objects.all();
		for query in queryset:
			query.averagerating = averagerating(query.song);
		queryset_json = serializers.serialize('json', queryset);
		return HttpResponse(queryset_json, content_type='application/json')

def deletesong(request):
	if(request.method == 'POST'):
		song_title = request.POST.get("song");
		Rating.objects.filter(song = song_title).delete();
		Artist.objects.filter(song = song_title).delete();
		return HttpResponse("Song successfully deleted.");

def deleterating(request):
	if(request.method == 'POST'):
		rat_title = request.POST.get("rating");
		Rating.objects.filter(rating = rat_title).delete();
		Artist.objects.filter(rating = rat_title).delete();
		return HttpResponse("Rating successfully deleted.");

def getbios(request):
	if(request.method == 'GET'):
		queryset = Attribute.objects.all();
		queryset_json = serializers.serialize('json', queryset);
		return HttpResponse(queryset_json, content_type='application/json')

def deletebio(request):
    if(request.method == 'POST'):
        artist_name = request.POST.get("artist_name");
        Artist.objects.filter(artist_name = artist_name).delete();
        return HttpResponse("Bio successfully deleted.");

