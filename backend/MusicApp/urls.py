from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, ArtistViewSet, RatingViewSet, AttributeViewSet
from . import views


router = routers.DefaultRouter()
router.register('user', UserViewSet)
router.register('artist', ArtistViewSet)
router.register('rating', RatingViewSet)
router.register('attribute', AttributeViewSet)


#set up the different paths availible for the users
app_name = "MusicApp"
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', views.index, name='index'),
    path('registration/', views.user_registration, name='registration'),
    path('songretrieval/', views.song_retrieval, name='songretrieval'),
    path('artistretrieval/', views.artist_retrieval, name='artistretrieval'),
    path('rate/', views.rate, name="rate"),
    path('listsongs/', views.list_songs, name="listsongs"),
    path('deletesong/', views.delete_song, name="deletesong"),
]