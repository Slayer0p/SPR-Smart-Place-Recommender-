from functools import lru_cache


def make_cache_key(mood: str, location: str) -> str:
    return f"{mood.lower().strip()}::{location.lower().strip()}"


@lru_cache(maxsize=300)
def get_cached_recommendation(key: str):
    return None
