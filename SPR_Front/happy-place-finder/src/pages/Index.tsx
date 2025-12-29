import { useState } from "react";

import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import LoadingState from "@/components/LoadingState";
import ResultSection from "@/components/ResultSection";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

import { getRecommendations } from "@/services/api";
import { RecommendationResponse } from "@/types/recommendation";

type ViewState = "input" | "loading" | "result" | "error" | "empty";

const Index = () => {
  const [viewState, setViewState] = useState<ViewState>("input");
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState("");
  const [lastRequest, setLastRequest] = useState<{
    mood: string;
    location: string;
  } | null>(null);

  const handleSubmit = async (mood: string, location: string) => {
    const normalizedMood = mood.trim();
    const normalizedLocation = location.trim();

    if (!normalizedMood || !normalizedLocation) {
      setError("Please enter both mood and location.");
      setViewState("error");
      return;
    }

    setViewState("loading");
    setError("");
    setLastRequest({
      mood: normalizedMood,
      location: normalizedLocation,
    });

    try {
      const response = await getRecommendations({
        mood: normalizedMood,
        location: normalizedLocation,
      });

      if (
        !response.recommendations ||
        response.recommendations.length === 0
      ) {
        setViewState("empty");
      } else {
        setResult(response);
        setViewState("result");
      }
    } catch (err) {
      console.error("Recommendation API error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      setError(message);
      setViewState("error");
    }
  };

  const handleReset = () => {
    setViewState("input");
    setResult(null);
    setError("");
  };

  const handleRetry = () => {
    if (lastRequest) {
      handleSubmit(lastRequest.mood, lastRequest.location);
    } else {
      handleReset();
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <main className="container mx-auto px-4 py-12 md:py-20 flex-1">
        <Header />

        <div className="mt-12">
          {viewState === "input" && (
            <InputForm
              onSubmit={handleSubmit}
              isLoading={false}
            />
          )}

          {viewState === "loading" && (
            <LoadingState />
          )}

          {viewState === "result" && result && (
            <ResultSection
              result={result}
              onReset={handleReset}
            />
          )}

          {viewState === "error" && (
            <ErrorState
              message={error}
              onRetry={handleRetry}
            />
          )}

          {viewState === "empty" && (
            <EmptyState onReset={handleReset} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by AI • Discover places that match your mood
        </p>
      </footer>
    </div>
  );
};

export default Index;
