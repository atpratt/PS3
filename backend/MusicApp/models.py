from django.db import models

class User(models.Model):
    username = models.CharField(max_length = 200, primary_key = True, default='SOME STRING')
    password = models.CharField(max_length = 200, default='SOME STRING')

    # def __str__(self):
    #     return (self.username)

class Attribute(models.Model):
    artist_name = models.CharField(max_length = 200, primary_key = True, default='SOME STRING')
    album = models.CharField(max_length = 200, default='SOME STRING')
    genre = models.CharField(max_length = 200, default='SOME STRING')
    year = models.IntegerField(default=2000)
    record_company = models.CharField(max_length = 200, default='SOME STRING')

    # def __str__(self):
    #     return (self.artist_name)
                # + "" + self.album
                # + "" + self.genre
                # + "" + str(self.year)
                # + "" + self.record_company)

class Artist(models.Model):
    song = models.CharField(max_length = 200, primary_key = True, default='SOME STRING')
    artist = models.ForeignKey(Attribute, max_length = 200, on_delete = models.CASCADE, default='SOME STRING')
    average = models.FloatField(default=0)

    # def __str__(self):
    #     art = self.artist.artist_name
    #     return (art)

class Rating(models.Model):
    username = models.ForeignKey(User, max_length = 200, on_delete=models.CASCADE, default='SOME STRING')
    song = models.ForeignKey(Artist, max_length = 200, on_delete=models.CASCADE,default='SOME STRINGS')
    rating = models.IntegerField(default = 1)

    # def __str__(self):
    #     usr = self.username.username
    #     sg = self.song.song
    #     return (usr + " " +  sg + "" + str(self.rating))

    class Meta:
        models.UniqueConstraint(fields = ['username', 'song'], name = 'unique_review')
