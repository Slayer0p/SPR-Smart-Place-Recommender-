import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="w-full max-w-md mx-auto py-12 animate-fade-in">
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Something went wrong
        </h3>
        <p className="text-muted-foreground mb-6">
          {message || "We couldn't process your request. Please try again."}
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border bg-card text-foreground font-medium hover:bg-muted transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
