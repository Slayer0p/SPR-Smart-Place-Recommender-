import os
import requests
from typing import List, Dict
from dotenv import load_dotenv
from requests.exceptions import RequestException, Timeout

from app.services.geocode import geocode_location
from app.services.place_normalizer import normalize_place_type

load_dotenv()

GEOAPIFY_API_KEY = os.getenv("GEOAPIFY_API_KEY")
BASE_URL = "https://api.geoapify.com/v2/places"


def fetch_places(place_types: List[str], location: str) -> List[Dict]:
    """
    Fetch places from Geoapify safely.
    - No crashes on timeout
    - Deduplicated results
    - Limited API calls
    """

    if not place_types or not location:
        return []

    # 🔒 LIMIT categories to reduce API load
    place_types = place_types[:3]

    lat, lon = geocode_location(location)
    results = []
    seen = set()

    for place_type in place_types:
        category = normalize_place_type(place_type)

        params = {
            "categories": category,
            "filter": f"circle:{lon},{lat},20000",
            "bias": f"proximity:{lon},{lat}",
            "limit": 3,
            "apiKey": GEOAPIFY_API_KEY
        }

        try:
            response = requests.get(BASE_URL, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()

        except Timeout:
            print(f"⚠️ Geoapify timeout for category: {category}")
            continue

        except RequestException as e:
            print(f"⚠️ Geoapify error for {category}: {e}")
            continue

        for feature in data.get("features", []):
            props = feature.get("properties", {})
            name = props.get("name")

            if not name or name in seen:
                continue

            seen.add(name)

            results.append({
                "name": name,
                "rating": props.get("rating"),
                "address": props.get("formatted")
            })

    return results
