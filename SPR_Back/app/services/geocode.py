import os
import requests
from functools import lru_cache

GEOAPIFY_API_KEY = os.getenv("GEOAPIFY_API_KEY")
GEOCODE_URL = "https://api.geoapify.com/v1/geocode/search"


@lru_cache(maxsize=100)
def geocode_location(location: str):
    print("📍 GEOCODING API HIT")
    params = {
        "text": location,
        "limit": 1,
        "apiKey": GEOAPIFY_API_KEY
    }

    response = requests.get(GEOCODE_URL, params=params, timeout=15)
    response.raise_for_status()
    data = response.json()

    features = data.get("features", [])
    if not features:
        raise RuntimeError("Unable to geocode location")

    coords = features[0]["geometry"]["coordinates"]
    return coords[1], coords[0]  # lat, lon
