import { Smile } from "lucide-react";

interface MoodInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const MoodInput = ({ value, onChange, disabled }: MoodInputProps) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor="mood-input" 
        className="flex items-center gap-2 text-sm font-medium text-foreground/80"
      >
        <Smile className="w-4 h-4 text-primary" />
        How are you feeling?
      </label>
      <textarea
        id="mood-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="I'm feeling adventurous and want to explore something new..."
        className="input-calming min-h-[100px] resize-none"
        aria-describedby="mood-hint"
      />
      <p id="mood-hint" className="text-xs text-muted-foreground">
        Express yourself freely — describe your mood, energy, or what you're looking for
      </p>
    </div>
  );
};

export default MoodInput;
