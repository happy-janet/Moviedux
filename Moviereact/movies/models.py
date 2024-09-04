from django.db import models

class Movie(models.Model):
    tmdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    rating = models.FloatField()
    image = models.CharField(max_length=255)
    youtube_url = models.URLField(blank=True, null=True) 

    def __str__(self):
        return self.title
