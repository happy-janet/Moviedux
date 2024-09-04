from rest_framework.decorators import api_view
from rest_framework.response import Response
from .tmdb_service import search_movies, get_movies_by_genre, get_default_movies

@api_view(['GET'])
def search_movie_view(request):
    query = request.query_params.get('query', '')
    movies = search_movies(query)
    return Response(movies)

@api_view(['GET'])
def genre_movie_view(request, genre_id):
    movies = get_movies_by_genre(genre_id)
    return Response(movies)

@api_view(['GET'])
def default_movie_view(request):
    movies = get_default_movies()
    return Response(movies)
# views.py
import requests
from django.http import JsonResponse
from django.conf import settings

# Add trailer or video information to your movie details if available
# views.py
import requests
from django.conf import settings
from django.http import JsonResponse

# views.py
import requests
from django.conf import settings
from django.http import JsonResponse

# views.py
import requests
from django.conf import settings
from django.http import JsonResponse

def movie_details(request, movie_id):
    api_key = settings.TMDB_API_KEY
    url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US'
    response = requests.get(url)
    if response.status_code == 200:
        movie_data = response.json()
        # Fetch video details
        video_url = f'https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key={api_key}&language=en-US'
        video_response = requests.get(video_url)
        if video_response.status_code == 200:
            movie_data['videos'] = video_response.json()
        return JsonResponse(movie_data)
    else:
        return JsonResponse({'error': 'Movie not found'}, status=404)
from django.http import JsonResponse
from .models import Movie

def movie_detail(request, id):
    try:
        movie = Movie.objects.get(id=id)
        response = {
            'title': movie.title,
            'description': movie.description,
            'youtube_url': movie.youtube_url,  # Ensure this is stored correctly
            'image': movie.image.url,
            'genre': movie.genre,
            'rating': movie.rating
        }
        return JsonResponse(response)
    except Movie.DoesNotExist:
        return JsonResponse({'error': 'Movie not found'}, status=404)
