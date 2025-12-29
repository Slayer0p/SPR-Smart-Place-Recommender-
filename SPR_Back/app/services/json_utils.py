import json
import re

def safe_json_parse(text: str) -> dict:
    """
    Extracts JSON from AI output safely
    """
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Try extracting JSON block
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return json.loads(match.group())

    raise ValueError("AI did not return valid JSON")
