import { MapPin } from "lucide-react";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const LocationInput = ({ value, onChange, disabled }: LocationInputProps) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor="location-input" 
        className="flex items-center gap-2 text-sm font-medium text-foreground/80"
      >
        <MapPin className="w-4 h-4 text-primary" />
        Where are you?
      </label>
      <input
        id="location-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="San Francisco, CA"
        className="input-calming"
        aria-describedby="location-hint"
      />
      <p id="location-hint" className="text-xs text-muted-foreground">
        Enter your city, neighborhood, or area
      </p>
    </div>
  );
};

export default LocationInput;
