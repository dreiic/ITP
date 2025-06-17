import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";
import "./GameDetails.css";

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // Učitaj sve igre, pa nađi ovu po ID
    fetch("http://localhost:5001/api/games")
      .then(res => res.json())
      .then(data => {
        const selected = data.find(item => item.id === parseInt(id));
        setGame(selected);
      });

    // Učitaj ocjene za ovu igru
    fetch(`http://localhost:5001/api/games/${id}/ratings`)
      .then(res => res.json())
      .then(setRatings);
  }, [id]);

  if (!game) return <p>Učitavanje...</p>;

  const average = ratings.length
    ? ratings.reduce((sum, r) => sum + r.ocjena, 0) / ratings.length
    : 0;

  return (
    <div className="game-details-container">
      <button className="btn back-btn" onClick={() => navigate("/dashboard")}>
        ← Nazad
      </button>

      <div className="game-header-split">
        {/* Slika lijevo */}
        <div className="game-left">
          <img
            src={game.slika_url}
            alt={game.naziv}
            className="game-banner-split"
          />
        </div>

        {/* Detalji i komentari desno */}
        <div className="game-right">
          <h2>{game.naziv}</h2>
          <p><strong>Žanr:</strong> {game.zanr}</p>
          <p>
            <strong>Prosječna ocjena:</strong>{" "}
            {"★".repeat(Math.round(average))} ({ratings.length} ocjena)
          </p>

          <a
            href={game.kupi_url}
            className="btn kupi-btn"
            target="_blank"
            rel="noreferrer"
          >
            Kupi igru
          </a>

          <div className="ratings-section">
            <h3>Komentari korisnika</h3>
            {ratings.length === 0 && <p>Još nema komentara.</p>}
            {ratings.map((r, i) => (
              <div key={i} className="rating-card">
                <div className="rating-stars">
                  {"★".repeat(r.ocjena)}{"☆".repeat(5 - r.ocjena)}
                </div>
                <p>
                  <strong>{r.korisnik}</strong> –{" "}
                  {new Date(r.datum).toLocaleString()}
                </p>
                <p>{r.komentar}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
