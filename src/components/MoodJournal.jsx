import { useState } from "react";
import "./MoodJournal.css";

export default function MoodJournal({ selectedMood, notes, setNotes }) {
  const [note, setNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const maxVisible = 5;

  const handleSave = () => {
    if (!note.trim()) return;
    const newEntry = {
      mood: selectedMood || "Unknown",
      text: note,
      date: new Date().toLocaleDateString(),
    };
    setNotes([newEntry, ...notes]); 
    setNote("");
  };

  const handleDelete = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNote(notes[index].text);
  };

  const handleUpdate = () => {
    const updated = notes.map((entry, i) =>
      i === editingIndex ? { ...entry, text: note } : entry
    );
    setNotes(updated);
    setEditingIndex(null);
    setNote("");
  };

  const visibleEntries = notes.slice(0, maxVisible);

  return (
    <div className="mood-journal">
      <h2>Your Mood Journal</h2>

      <textarea
        className="mood-textarea"
        placeholder="Write your thoughts..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>

      {editingIndex !== null ? (
        <button className="mood-save-btn" onClick={handleUpdate}>
          Update Entry
        </button>
      ) : (
        <button className="mood-save-btn" onClick={handleSave}>
          Save Entry
        </button>
      )}

      <div className="mood-entries">
        <h3>Recent Entries</h3>
        {visibleEntries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          visibleEntries.map((entry, index) => (
            <div key={index} className="mood-entry-card">
              <p className="entry-date">{entry.date}</p>
              <p className="entry-mood">Mood: {entry.mood}</p>
              <p className="entry-text">{entry.text}</p>
              <div className="entry-actions">
                <button
                  className="edit-entry-btn"
                  onClick={() => handleEdit(index)}
                >
                  <i className="bx bx-edit"></i>Edit
                </button>
                <button
                  className="delete-entry-btn"
                  onClick={() => handleDelete(index)}
                >
                  <i className="bx bx-trash"></i>Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
