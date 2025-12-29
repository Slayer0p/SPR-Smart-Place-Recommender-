// src/types/recommendation.ts

export interface Place {
  name: string;
  reason: string;
  rating?: number;
  address?: string;
}

export interface RecommendationPlan {
  intent: string;
  reasoning: string;
  vibe?: string[];
  avoid?: string[];
  ideal_time?: string;
}

export interface RecommendationResponse {
  plan: RecommendationPlan;
  recommendations: Place[];
}

export interface RecommendationRequest {
  mood: string;
  location: string;
}
