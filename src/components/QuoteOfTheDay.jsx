import { useState, useEffect } from "react";
import "./QuoteOfTheDay.css";

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch(
          "https://api.allorigins.win/get?url=https://zenquotes.io/api/today"
        );
        const data = await res.json();
        const parsed = JSON.parse(data.contents);

        setQuote({
          content: parsed[0].q,
          author: parsed[0].a,
        });

      } catch (err) {
        console.error("Ошибка при загрузке цитаты:", err);
        setError("Failed to load quote");
      } finally {
        setLoading(false);
      }
    }
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

