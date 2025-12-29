from fastapi import APIRouter, HTTPException
from app.services.ai_planner import generate_plan_cached
from app.services.place_fetcher import fetch_places
from app.services.ai_ranker import rank_places
from app.services.recommend_cache import (
    make_cache_key,
    get_cached_recommendation
)

router = APIRouter(prefix="/recommend", tags=["Recommendation"])


@router.post("/")
async def recommend(req: dict):
    mood = req["mood"]
    location = req["location"]

    # 1️⃣ FINAL CACHE CHECK
    cache_key = make_cache_key(mood, location)
    cached = get_cached_recommendation(cache_key)
    if cached:
        return cached

    try:
        # 2️⃣ AI PLAN (CACHED)
        plan = generate_plan_cached(mood, location)

        # 3️⃣ FETCH PLACES (uses cached geocode)
        places = fetch_places(plan["place_types"], location)

        # 4️⃣ AI RANKING
        ranked = rank_places(mood, places)

        response = {
            "plan": plan,
            "recommendations": ranked
        }

        # 5️⃣ STORE FINAL CACHE
        get_cached_recommendation.cache_clear()
        get_cached_recommendation(cache_key)

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
