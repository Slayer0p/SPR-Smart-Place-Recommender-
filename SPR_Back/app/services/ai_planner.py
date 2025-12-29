from functools import lru_cache
from app.services.ai_client import call_ai
from app.services.json_utils import safe_json_parse


@lru_cache(maxsize=200)
def generate_plan_cached(mood: str, location: str) -> dict:
    print("🔥 AI PLAN CALLED (CACHE MISS)")
    """
    Cached AI planner.
    Same mood + location → no repeated AI calls.
    """

    prompt = f"""
You are a Smart Place Recommendation AI Agent.

Mood: "{mood}"
Location: "{location}"

STRICT RULES:
- Return ONLY valid JSON
- Do NOT add text before or after JSON
- Do NOT omit keys

JSON FORMAT:
{{
  "intent": "",
  "place_types": [],
  "vibe": [],
  "avoid": [],
  "ideal_time": "",
  "reasoning": ""
}}
"""

    result = call_ai(prompt)
    return safe_json_parse(result)
