import { useState } from "react";
import MoodSelector from "./MoodSelector";
import MoodJournal from "./MoodJournal";
import "./MoodTracker.css";

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState("");

  return (
    <div className="mood-container">
      <div className="mood-content">
        <MoodSelector
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
        />
        <MoodJournal selectedMood={selectedMood} />
      </div>
    </div>
  );
}

