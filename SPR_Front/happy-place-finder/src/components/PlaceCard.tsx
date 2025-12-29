import { MapPin } from "lucide-react";
import { Place } from "@/types/recommendation";

interface PlaceCardProps {
  place: Place;
  index: number;
}

const PlaceCard = ({ place, index }: PlaceCardProps) => {
  return (
    <article 
      className="card-place opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {place.name}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {place.reason}
          </p>
        </div>
      </div>
    </article>
  );
};

export default PlaceCard;
