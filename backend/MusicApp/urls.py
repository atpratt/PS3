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
    path('getsongs/', views.getsongs),
    path('deletesong/', views.deletesong),
    path('getbios/', views.getsongs),
    path('deletebio/', views.deletesong),
    # path('getitem/', views.getitem),
    # path('deleteitem/', views.deleteitem),
    #path('', views.index, name='index'),
    path('user_registration/', views.user_registration),
    # path('songretrieval/', views.song_retrieval, name='songretrieval'),
    # path('artistretrieval/', views.artist_retrieval, name='artistretrieval'),
    # path('rate/', views.rate, name="rate"),
    
]