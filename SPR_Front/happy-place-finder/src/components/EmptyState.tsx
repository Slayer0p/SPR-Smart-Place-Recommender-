import { Search, ArrowLeft } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState = ({ onReset }: EmptyStateProps) => {
  return (
    <div className="w-full max-w-md mx-auto py-12 animate-fade-in">
      <div className="rounded-2xl border border-border/50 bg-card p-8 text-center shadow-soft">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Search className="w-7 h-7 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No places found
        </h3>
        <p className="text-muted-foreground mb-6">
          We couldn't find places matching your mood in that area. Try describing your mood differently or exploring a different location.
        </p>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border bg-card text-foreground font-medium hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Search again
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
