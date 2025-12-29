from app.services.ai_client import call_ai
from app.services.json_utils import safe_json_parse

def rank_places(mood: str, places: list) -> list:
    prompt = f"""
You are a place ranking AI.

INPUT:
User mood: "{mood}"

Places (JSON array):
{places}

STRICT RULES:
- Return ONLY valid JSON
- Do NOT include explanations or markdown
- Output must start with '[' and end with ']'
- Do NOT omit any items
- Each item MUST contain "name" and "reason"

OUTPUT FORMAT:
[
  {{
    "name": "",
    "reason": ""
  }}
]
"""

    result = call_ai(prompt)
    return safe_json_parse(result)
