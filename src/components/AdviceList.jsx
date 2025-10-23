import { useState, useEffect } from "react";
import advicesData from "../data/adviceData.json";
import "./AdviceList.css";

export default function AdviceList() {
  const [advices, setAdvices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMood, setFilterMood] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setAdvices(advicesData);
  }, []);

  const filteredAdvices = advices.filter((advice) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      advice.text.toLowerCase().includes(search) ||
      advice.keywords.some((kw) => kw.toLowerCase().includes(search));
    const matchesMood =
      !filterMood ||
      advice.mood.toLowerCase() === filterMood.toLowerCase();
    return matchesSearch && matchesMood;
  });

  const visibleAdvices = filteredAdvices.slice(0, visibleCount);

  return (
    <div className="advice-container">
      <h2 className="title">MindFlow Daily Advice</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search advice..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterMood}
          onChange={(e) => setFilterMood(e.target.value)}
          className="mood-select"
        >
          <option value="">All moods</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Stressed">Stressed</option>
          <option value="Anxious">Anxious</option>
          <option value="Motivated">Motivated</option>
          <option value="Tired">Tired</option>
          <option value="Proud">Proud</option>
        </select>
      </div>

      <ul className="advice-list">
        {visibleAdvices.map((advice) => (
          <li key={advice.id} className="advice-item">
            <p>{advice.text}</p>
            <span className="mood-tag">{advice.mood}</span>
          </li>
        ))}
      </ul>

      {visibleCount < filteredAdvices.length && (
        <button
          className="load-more-btn"
          onClick={() => setVisibleCount(visibleCount + 3)}
        >
          Show more
        </button>
      )}
    </div>
  );
}
