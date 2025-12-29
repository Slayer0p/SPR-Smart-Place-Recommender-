import { Lightbulb, ArrowLeft } from "lucide-react";
import { RecommendationResponse } from "@/types/recommendation";
import PlaceCard from "./PlaceCard";

interface ResultSectionProps {
  result: RecommendationResponse;
  onReset: () => void;
}

const ResultSection = ({ result, onReset }: ResultSectionProps) => {
  const { plan, recommendations } = result;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Back button */}
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Start a new search
      </button>

      {/* AI Intent Section */}
      <div
        className="rounded-2xl border border-primary/20 bg-primary-light p-6 opacity-0 animate-fade-in"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              What we understood
            </h2>

            <p className="text-foreground/80 mb-3">
              <span className="font-medium">Your vibe:</span>{" "}
              {plan.intent}
            </p>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {plan.reasoning}
            </p>
          </div>
        </div>
      </div>

      {/* Places Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-foreground">
          Places we found for you
        </h2>

        {recommendations && recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((place, index) => (
              <PlaceCard
                key={`${place.name}-${index}`}
                place={place}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-8 text-center">
            No specific places found — try describing your mood a bit differently.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultSection;
