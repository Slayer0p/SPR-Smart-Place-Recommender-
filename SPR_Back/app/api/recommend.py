from fastapi import APIRouter, HTTPException
from app.services.ai_planner import generate_plan_cached
from app.services.place_fetcher import fetch_places
from app.services.ai_ranker import rank_places
from app.services.recommend_cache import (
    make_cache_key,
    get_cached_recommendation
)

router = APIRouter(
    prefix="/recommend",
    tags=["Recommendation"]
)

# ✅ OPTIONS — both paths
@router.options("")
@router.options("/")
def options_recommend():
    return

# ✅ POST — both paths
@router.post("")
@router.post("/")
async def recommend(req: dict):
    mood = req["mood"]
    location = req["location"]

    cache_key = make_cache_key(mood, location)
    cached = get_cached_recommendation(cache_key)
    if cached:
        return cached

    try:
        plan = generate_plan_cached(mood, location)
        places = fetch_places(plan["place_types"], location)
        ranked = rank_places(mood, places)

        return {
            "plan": plan,
            "recommendations": ranked
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
