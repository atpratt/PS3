from django.contrib import admin

# Register your models here.
from .models import User
from .models import Attribute
from .models import Artist
from .models import Rating

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username",)
    search_fields = ("username",)

@admin.register(Attribute)
class AttributeAdmin(admin.ModelAdmin):
    list_display = ("artist_name",)

@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ("song",)

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ("rating",)
    list_display = ("song_id",)
    list_display = ("username_id",)