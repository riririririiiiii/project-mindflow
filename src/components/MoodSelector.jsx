import { useState, useEffect } from "react";
import "./MoodTracker.css";

export default function MoodSelector({ selectedMood, setSelectedMood }) {
    const moods = [
        { image: "/src/assets/emojis/happy.png", label: "Happy" },
        { image: "/src/assets/emojis/excited.png", label: "Excited" },
        { image: "/src/assets/emojis/proud.png", label: "Proud" },
        { image: "/src/assets/emojis/thinking.png", label: "Thinking" },
        { image: "/src/assets/emojis/speechless.png", label: "Speechless" },
        { image: "/src/assets/emojis/embarrassed.png", label: "Embarrassed" },
        { image: "/src/assets/emojis/wronged.png", label: "Wronged" },
        { image: "/src/assets/emojis/cry.png", label: "Cry" },
        { image: "/src/assets/emojis/angry.png", label: "Angry" },
    ];

    useEffect(() => {
        const saved = localStorage.getItem("mood");
        if (saved) setSelectedMood(saved);
    }, []);

    useEffect(() => {
        if (selectedMood) localStorage.setItem("mood", selectedMood);
    }, [selectedMood]);

    return (
        <div className="mood-selector">
            <h2>How are you feeling today?</h2>
            <div className="mood-options">
                {moods.map((m) => (
                    <button
                        key={m.label}
                        className={`mood-btn ${selectedMood === m.label ? "active" : ""}`}
                        onClick={() => setSelectedMood(m.label)}
                    >
                        <img src={m.image} alt={m.label} className="emoji-img" />
                        <p>{m.label}</p>
                    </button>
                ))}
            </div>

            {selectedMood && (
                <p className="mood-message">
                    You’re feeling <strong>{selectedMood}</strong> today 
                </p>
            )}
        </div>
    );
}
