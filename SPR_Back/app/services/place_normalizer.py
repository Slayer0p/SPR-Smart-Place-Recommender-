def normalize_place_type(place_type: str) -> str:
    """
    Convert AI-generated place types into Geoapify-friendly categories.
    """

    p = place_type.lower()

    if "park" in p or "garden" in p or "nature" in p:
        return "leisure.park"

    if "cafe" in p or "coffee" in p:
        return "catering.cafe"

    if "library" in p or "book" in p:
        return "education.library"

    if "yoga" in p or "meditation" in p or "wellness" in p:
        return "healthcare"

    if "spa" in p:
        return "healthcare.spa"

    return "tourism.attraction"
