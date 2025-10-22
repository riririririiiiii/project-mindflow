import { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "./HabitTracker.css";

export default function HabitTracker({ habits, setHabits }) {
  const [newHabit, setNewHabit] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("bx bx-leaf");
  const [editMode, setEditMode] = useState(false);

  const icons = [
    "bx bx-brain",
    "bx bx-water",
    "bx bx-book",
    "bx bx-dumbbell",
    "bx bx-moon",
    "bx bx-coffee",
    "bx bx-sun",
    "bx bx-walk",
    "bx bx-heart",
  ];

  const toggleHabit = (index) => {
    if (editMode) return;
    const updated = habits.map((habit, i) =>
      i === index ? { ...habit, done: !habit.done } : habit
    );
    setHabits(updated);
  };

  const addHabit = () => {
    if (newHabit.trim() === "") return;
    const updated = [
      ...habits,
      { name: newHabit, done: false, icon: selectedIcon },
    ];
    setHabits(updated);
    setNewHabit("");
    setSelectedIcon("bx bx-leaf");
  };

  const deleteHabit = (index) => {
    const updated = habits.filter((_, i) => i !== index);
    setHabits(updated);
  };

  return (
    <div className="habit-container">
      <div className="habit-header">
        <h2>Daily Habit Tracker</h2>
        <button
          className={`edit-btn ${editMode ? "active" : ""}`}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? (
            <>
              <i className="bx bx-check"></i> Done Editing
            </>
          ) : (
            <>
              <i className="bx bx-edit"></i> Edit Habits
            </>
          )}
        </button>
      </div>

      <div className="habit-input">
        <input
          type="text"
          placeholder="Add new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />

        <select
          className="icon-select"
          value={selectedIcon}
          onChange={(e) => setSelectedIcon(e.target.value)}
        >
          {icons.map((icon, i) => (
            <option key={i} value={icon}>
              {icon.replace("bx bx-", "")}
            </option>
          ))}
        </select>

        <button className="add-btn" onClick={addHabit}>
          <i className="bx bx-plus"></i>
        </button>
      </div>

      <div className="habit-list">
        {habits.map((habit, index) => (
          <div
            key={index}
            className={`habit-item ${habit.done ? "done" : ""}`}
            onClick={() => toggleHabit(index)}
          >
            <div className="habit-left">
              <i
                className={`bx ${
                  habit.done ? "bx-check-circle" : "bx-circle"
                } status-icon`}
              ></i>
              <i className={`${habit.icon} habit-icon`}></i>
              <p>{habit.name}</p>
            </div>

            {editMode && (
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHabit(index);
                }}
              >
                <i className="bx bx-trash"></i>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
