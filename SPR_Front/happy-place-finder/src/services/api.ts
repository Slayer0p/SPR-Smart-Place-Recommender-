import { RecommendationRequest, RecommendationResponse } from "@/types/recommendation";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

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

console.log("API URL:", API_BASE_URL);