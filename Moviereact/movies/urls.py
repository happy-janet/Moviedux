from django.urls import path
from .views import search_movie_view, genre_movie_view, default_movie_view
from .views import movie_details

urlpatterns = [
    path('search/', search_movie_view, name='search_movie'),
    path('genre/<int:genre_id>/', genre_movie_view, name='genre_movie'),
    path('default/', default_movie_view, name='default_movie'),
    path('api/movie/<int:movie_id>/', movie_details, name='movie_details'),
    
]
