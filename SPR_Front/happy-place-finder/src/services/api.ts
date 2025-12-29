import { RecommendationRequest, RecommendationResponse } from "@/types/recommendation";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getRecommendations(
  request: RecommendationRequest
): Promise<RecommendationResponse> {
  const response = await fetch(`${API_BASE_URL}/recommend/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to get recommendations: ${response.statusText}`);
  }

  return response.json();
}
