import { useState, useEffect } from "react";
import "./MusicList.css";

export default function MusicList() {
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("relax");
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favTracks")) || [];
        } catch {
            return [];
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const moodToQuery = {
        happy: "pop upbeat",
        sad: "acoustic ballad",
        stressed: "piano instrumental",
        anxious: "ambient chill",
        motivated: "workout energy",
        relaxed: "lofi chill",
        focus: "study beats",
    };

    const saveFavorites = (arr) => {
        setFavorites(arr);
        try {
            localStorage.setItem("favTracks", JSON.stringify(arr));
        } catch { }
    };

    useEffect(() => {
        if (!query) {
            setItems([]);
            return;
        }

        let mounted = true;
        setLoading(true);
        setError(null);

        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
            query
        )}&entity=song&limit=30`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Network response not OK");
                return res.json();
            })
            .then((data) => {
                if (!mounted) return;
                const list = Array.isArray(data.results) ? data.results : [];
                setItems(list);
            })
            .catch((err) => {
                console.error("iTunes fetch error:", err);
                if (mounted) setError("Failed to load music. Try again later.");
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [query]);

    const addFavorite = (track) => {
        if (!track) return;
        const id = track.trackId ?? `${track.artistName}-${track.trackName}`;
        if (favorites.some((f) => (f.trackId ?? f.id) === id)) return;
        const toSave = { ...track, id: id };
        saveFavorites([toSave, ...favorites]);
    };

    // remove favorite
    const removeFavorite = (id) => {
        const updated = favorites.filter((f) => (f.trackId ?? f.id) !== id);
        saveFavorites(updated);
    };

    const filtered = items.filter((item) => {
        if (!searchTerm) return true;
        const q = searchTerm.toLowerCase();
        const title = (item.trackName || "").toLowerCase();
        const artist = (item.artistName || "").toLowerCase();
        return title.includes(q) || artist.includes(q);
    });

    const handleMoodSelect = (mood) => {
        const q = moodToQuery[mood] || mood;
        setQuery(q);
        setSearchTerm("");
    };

    return (
        <section className="music-section fade-in">
            <h2>Music for Your Mood</h2>

            <div className="music-search">

                <div style={{ display: "flex", gap: 8 }}>
                    <button className="music-pill" onClick={() => handleMoodSelect("relaxed")}>Relax</button>
                    <button className="music-pill" onClick={() => handleMoodSelect("happy")}>Happy</button>
                    <button className="music-pill" onClick={() => handleMoodSelect("motivated")}>Motivate</button>
                    <button className="music-pill" onClick={() => handleMoodSelect("sad")}>Sad</button>
                    <button className="music-pill" onClick={() => handleMoodSelect("stressed")}>Stressed</button>
                    <button className="music-pill" onClick={() => handleMoodSelect("anxious")}>Anxious</button>
                </div>

                <input
                    type="text"
                    placeholder="Search iTunes (artist, keyword)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                        }
                    }}
                />
            </div>

            {loading && <p style={{ textAlign: "center" }}>Loading music…</p>}
            {error && <p style={{ textAlign: "center", color: "crimson" }}>{error}</p>}

            {!loading && !error && filtered.length === 0 && (
                <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
                    No tracks found.
                </p>
            )}

            <div className="music-list">
                {filtered.map((track) => {
                    const id = track.trackId ?? `${track.artistName}-${track.trackName}`;
                    const title = track.trackName ?? "Unknown title";
                    const artist = track.artistName ?? "Unknown artist";
                    const thumb = track.artworkUrl100?.replace("100x100", "300x300") ?? null;
                    const preview = track.previewUrl ?? null;

                    return (
                        <div key={id} className="music-card">
                            {thumb && <img src={thumb} alt={title} />}

                            <div className="music-info">
                                <h3>{title}</h3>
                                <p>{artist}</p>
                                {preview && (
                                    <audio controls>
                                        <source src={preview} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                            </div>

                            <div>
                                <button className="save-btn" onClick={() => addFavorite(track)}>
                                    Add to favorites
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="favorites-section">
                <h3> Favorites</h3>
                {favorites.length === 0 && <p>No favorites yet.</p>}

                {favorites.map((fav) => (
                    <div key={fav.id} className="favorite-card">
                        <div>
                            <strong>{fav.trackName ?? fav.title}</strong>
                            <div>{fav.artistName ?? fav.artist}</div>
                        </div>
                        <div>
                            <button className="save-btn" onClick={() => removeFavorite(fav.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
