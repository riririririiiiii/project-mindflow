import "./App.css";
import QuoteOfTheDay from "./components/QuoteOfTheDay";
import MoodSelector from "./components/MoodSelector";
import MoodJournal from "./components/MoodJournal";
import HabitTracker from "./components/HabitTracker";
import Dashboard from "./components/Dashboard";
import { useState, useEffect } from "react";

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedMood, setSelectedMood] = useState(() => {
    return localStorage.getItem("mood") || "";
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("mood", selectedMood);
  }, [habits, notes, selectedMood]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>MindFlow </h1>
        <p>Your daily wellness companion</p>
      </header>

      <main className="content">
        <section className="wide-section">
          <QuoteOfTheDay />
        </section>

        <section className="mood-section">
          <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
          <MoodJournal selectedMood={selectedMood} notes={notes} setNotes={setNotes} />
        </section>

        <section className="habit-section">
          <HabitTracker habits={habits} setHabits={setHabits} />
        </section>

        <section className="dashboard-section">
          <Dashboard habits={habits} notes={notes} />
        </section>
      </main>


      <footer className="app-footer">
        <p>© 2025 MindFlow – wellness through awareness </p>
      </footer>
    </div>
  );
}

export default App;

