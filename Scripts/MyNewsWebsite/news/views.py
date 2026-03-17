import os
import requests
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.views.decorators.cache import cache_page

CURRENTS_API_KEY = os.environ.get('CURRENTS_API_KEY')
CURRENTS_BASE_URL = 'https://api.currentsapi.services/v1'

FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557992260-ec58e38d363c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551817958-20204d6ab212?q=80&w=800&auto=format&fit=crop',
]

def get_fallback_image(article_id: str) -> str:
    index = sum(ord(c) for c in article_id)
    return FALLBACK_IMAGES[index % len(FALLBACK_IMAGES)]

def format_article(item: dict) -> dict:
    image = item.get('image', '')
    if not image or image == 'None':
        image = get_fallback_image(item.get('id', '0'))

    description = item.get('description', '')
    read_time = max(1, len(description.split()) // 200)

    return {
        'id': item.get('id'),
        'title': item.get('title'),
        'excerpt': description,
        'category': item.get('category', ['General'])[0] if item.get('category') else 'General',
        'author': item.get('author') or 'Unknown',
        'date': item.get('published', ''),
        'imageUrl': image,
        'readTime': f'{read_time} min read',
        'url': item.get('url', '#'),
    }

@require_GET
@cache_page(60 * 5)  # Cache for 5 minutes
def get_news(request):
    if not CURRENTS_API_KEY:
        return JsonResponse({'error': 'API key not configured'}, status=500)

    category = request.GET.get('category', '')
    keywords = request.GET.get('keywords', '')
    page = request.GET.get('page', '1')

    params = {
        'apiKey': CURRENTS_API_KEY,
        'language': 'en',
        'page_number': page,
    }

    if category and category.lower() != 'all':
        params['category'] = category.lower()

    if keywords:
        params['keywords'] = keywords

    try:
        response = requests.get(
            f'{CURRENTS_BASE_URL}/search',
            params=params,
            timeout=10
        )
        response.raise_for_status()
        data = response.json()

        if data.get('status') != 'ok':
            return JsonResponse({'error': 'Failed to fetch news'}, status=502)

        articles = [format_article(item) for item in data.get('news', [])]

        return JsonResponse({
            'status': 'ok',
            'articles': articles,
            'page': int(page),
        })

    except requests.Timeout:
        return JsonResponse({'error': 'Request timed out'}, status=504)
    except requests.RequestException as e:
        return JsonResponse({'error': str(e)}, status=502)


@require_GET
@cache_page(60 * 5)
def get_latest(request):
    """Returns latest news for breaking headlines and featured section"""
    if not CURRENTS_API_KEY:
        return JsonResponse({'error': 'API key not configured'}, status=500)

    try:
        response = requests.get(
            f'{CURRENTS_BASE_URL}/latest-news',
            params={'apiKey': CURRENTS_API_KEY, 'language': 'en'},
            timeout=10
        )
        response.raise_for_status()
        data = response.json()

        if data.get('status') != 'ok':
            return JsonResponse({'error': 'Failed to fetch news'}, status=502)

        articles = [format_article(item) for item in data.get('news', [])]

        return JsonResponse({
            'status': 'ok',
            'articles': articles,
        })

    except requests.Timeout:
        return JsonResponse({'error': 'Request timed out'}, status=504)
    except requests.RequestException as e:
        return JsonResponse({'error': str(e)}, status=502)
