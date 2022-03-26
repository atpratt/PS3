from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, ArtistViewSet, RatingViewSet, AttributeViewSet

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
]