import { MapPin, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="text-center mb-12 animate-fade-in">
      <div className="inline-flex items-center justify-center gap-2 mb-6">
        <div className="relative">
          <MapPin className="w-10 h-10 text-primary animate-float" strokeWidth={1.5} />
          <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground mb-4 tracking-tight">
        Find Your Perfect Spot
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
        Tell us how you're feeling and where you are. We'll discover places that match your mood perfectly.
      </p>
    </header>
  );
};

export default Header;
