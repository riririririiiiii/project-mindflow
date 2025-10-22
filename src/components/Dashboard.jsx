import "./Dashboard.css";

export default function Dashboard({ habits = [], notes = [] }) {
  const completedHabits = habits.filter((h) => h.done).length;
  const totalHabits = habits.length;

  const progress = totalHabits
    ? Math.round((completedHabits / totalHabits) * 100)
    : 0;

  const lastEntry = notes.length > 0 ? notes[notes.length - 1] : null;
  const motivation =
    progress >= 80
      ? "You're doing amazing!"
      : progress >= 40
        ? "Keep going — progress, not perfection :D"
        : "Small steps count too. You’ve got this";

  return (
    <div className="dashboard wide-section">
      <h2>Your Dashboard</h2>

      <div className="dashboard-stats">
        <div className="dashboard-card">
          <h3>{completedHabits}</h3>
          <p>Habits Completed</p>
        </div>

        <div className="dashboard-card">
          <h3>{notes.length}</h3>
          <p>Journal Entries</p>
        </div>

        <div className="dashboard-card">
          <h3>{progress}%</h3>
          <p>Daily Progress</p>
        </div>
      </div>

      <div className="progress-section">
        <p>Overall Progress</p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-text">{progress}% done</p>
      </div>

      {lastEntry && (
        <div className="recent-entry">
          <h4>Last Mood</h4>
          <p>
            <strong>{lastEntry.mood}</strong> — {lastEntry.date}
          </p>
          <p>{lastEntry.text}</p>
        </div>
      )}
      <p className="motivation">{motivation}</p>
    </div>
  );
}
