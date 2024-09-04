import requests

TMDB_API_KEY = 'b482d5d15eea5207ec4eb7e49570a8e6' # Replace with your actual TMDb API key
TMDB_BASE_URL = 'https://api.themoviedb.org/3'

def search_movies(query):
    url = f"{TMDB_BASE_URL}/search/movie"
    params = {'api_key': TMDB_API_KEY, 'query': query}
    response = requests.get(url, params=params)
    return response.json()

def get_movies_by_genre(genre_id):
    url = f"{TMDB_BASE_URL}/discover/movie"
    params = {'api_key': TMDB_API_KEY, 'with_genres': genre_id}
    response = requests.get(url, params=params)
    return response.json()

def get_default_movies():
    url = f"{TMDB_BASE_URL}/movie/popular"
    params = {'api_key': TMDB_API_KEY}
    response = requests.get(url, params=params)
    return response.json()
