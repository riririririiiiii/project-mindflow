import { useState, useEffect } from "react";
import "./QuoteOfTheDay.css";

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://api.allorigins.win/get?url=https://zenquotes.io/api/today");
        if (!res.ok) throw new Error("Failed to fetch quote");
        const data = await res.json();
        const parsed = JSON.parse(data.contents);
        setQuote(parsed[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, []);

  if (loading) return <p className="quote-loading">Loading...</p>;
  if (error) return <p className="quote-error">Error: {error}</p>;

  return (
    <div className="quote-container">
      <h2 className="quote-title">Quote of the Day</h2>
      <blockquote className="quote-text">“{quote.content}”</blockquote>
      <p className="quote-author">— {quote.author}</p>
    </div>
  );
}
