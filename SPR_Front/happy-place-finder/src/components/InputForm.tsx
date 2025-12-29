import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import MoodInput from "./MoodInput";
import LocationInput from "./LocationInput";

interface InputFormProps {
  onSubmit: (mood: string, location: string) => void;
  isLoading: boolean;
}

const InputForm = ({ onSubmit, isLoading }: InputFormProps) => {
  const [mood, setMood] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mood.trim() && location.trim()) {
      onSubmit(mood.trim(), location.trim());
    }
  };

  const isValid = mood.trim().length > 0 && location.trim().length > 0;

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl mx-auto space-y-6 animate-fade-in"
      style={{ animationDelay: "0.1s" }}
    >
      <div className="rounded-3xl border border-border/50 bg-card p-6 md:p-8 shadow-card space-y-6">
        <MoodInput 
          value={mood} 
          onChange={setMood} 
          disabled={isLoading} 
        />
        <LocationInput 
          value={location} 
          onChange={setLocation} 
          disabled={isLoading} 
        />
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="btn-primary w-full"
          aria-label={isLoading ? "Finding places..." : "Discover places"}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Discovering places...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Discover Places
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
