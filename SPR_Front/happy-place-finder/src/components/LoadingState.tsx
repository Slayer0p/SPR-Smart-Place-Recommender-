import { Sparkles } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="w-full max-w-2xl mx-auto py-12 animate-fade-in">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-primary/30 animate-ping" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-display font-medium text-foreground">
            Finding your perfect spots...
          </h3>
          <p className="text-muted-foreground">
            Our AI is exploring places that match your vibe
          </p>
        </div>
        {/* Skeleton cards */}
        <div className="w-full mt-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="rounded-2xl border border-border/50 bg-card p-6"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="space-y-3">
                <div 
                  className="h-5 w-40 rounded-lg bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer" 
                />
                <div 
                  className="h-4 w-full rounded-lg bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer" 
                />
                <div 
                  className="h-4 w-3/4 rounded-lg bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
