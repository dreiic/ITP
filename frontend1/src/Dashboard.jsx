import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingModal from "./RatingModal";
import EditProfileModal from "./EditProfileModal";
import WishlistModal from "./WishlistModal";
import "./App.css";

export default function Dashboard({ currentUser, token, onLogout }) {
  const [games, setGames] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [newGame, setNewGame] = useState({
    naziv: "",
    zanr: "",
    slika_url: "",
    kupi_url: ""
  });

  // Filter i sortiranje
  const [filterGenre, setFilterGenre] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Dinamički žanrovi
  const [filterGenreOptions, setFilterGenreOptions] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const isAdmin = currentUser?.email === "dreicedis@gmail.com";

  // Učitaj igre i wishlist
  useEffect(() => {
    fetch("http://localhost:5001/api/games")
      .then((r) => r.json())
      .then(async (data) => {
        const gamesWithAvg = await Promise.all(
          data.map(async (g) => {
            try {
              const res = await fetch(`http://localhost:5001/api/games/${g.id}/ratings`);
              if (!res.ok) return { ...g, average: 0 };
              const ratings = await res.json();
              let avg = 0;
              if (ratings.length > 0) {
                avg = ratings.reduce((sum, r) => sum + r.ocjena, 0) / ratings.length;
              }
              return { ...g, average: avg };
            } catch {
              return { ...g, average: 0 };
            }
          })
        );
        setGames(gamesWithAvg);
      });

    fetch(`http://localhost:5001/api/wishlist/${currentUser.id}`)
      .then(r => r.json())
      .then(setWishlist);
  }, [currentUser.id]);

  // Učitaj dinamičke žanrove iz backend-a
  useEffect(() => {
    fetch("http://localhost:5001/api/games/genres")
      .then(res => res.json())
      .then(setFilterGenreOptions)
      .catch(() => setFilterGenreOptions([]));
  }, []);

  // Search users on input change
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetch(`http://localhost:5001/api/users/search?q=${encodeURIComponent(searchQuery)}`)
        .then(res => res.json())
        .then(setSearchResults)
        .catch(() => setSearchResults([]));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newGame)
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setGames((g) => [...g, { id: data.id, ratings: [], average: 0, ...newGame }]);
      setNewGame({ naziv: "", zanr: "", slika_url: "", kupi_url: "" });
    } catch {
      alert("Greška kod dodavanja");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Obrisati igru?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/games/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      setGames((g) => g.filter((x) => x.id !== id));
    } catch {
      alert("Greška kod brisanja");
    }
  };

  async function handleWishlistToggle(igra_id, inWishlist) {
    if (inWishlist) {
      await fetch("http://localhost:5001/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ korisnik_id: currentUser.id, igra_id })
      });
      setWishlist(wishlist => wishlist.filter(w => w.id !== igra_id));
    } else {
      await fetch("http://localhost:5001/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ korisnik_id: currentUser.id, igra_id })
      });
      const wl = await fetch(`http://localhost:5001/api/wishlist/${currentUser.id}`).then(r => r.json());
      setWishlist(wl);
    }
  }

  // Filtriranje i sortiranje igara
  const filteredAndSortedGames = games
    .filter(game => filterGenre ? game.zanr === filterGenre : true)
    .sort((a, b) => {
      if (sortBy === "rating_desc") return (b.average || 0) - (a.average || 0);
      if (sortBy === "rating_asc") return (a.average || 0) - (b.average || 0);
      if (sortBy === "naziv_asc") return a.naziv.localeCompare(b.naziv);
      if (sortBy === "naziv_desc") return b.naziv.localeCompare(a.naziv);
      return 0;
    });

  function renderStars(avg = 0) {
    const rounded = Math.round(avg || 0);
    return (
      <div className="stars-row">
        {[1, 2, 3, 4, 5].map(i => (
          <i
            key={i}
            className={i <= rounded ? "fas fa-star star-filled" : "far fa-star star-empty"}
          />
        ))}
        <span className="stars-avg">{avg ? avg.toFixed(1) : "N/A"}</span>
      </div>
    );
  }

  function updateProfileLocal(updated) {
    Object.assign(currentUser, updated);
    localStorage.setItem("korisnik", JSON.stringify(currentUser));
    setShowEdit(false);
    window.location.reload();
  }

  return (
    <>
      <header className="header" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e5e5",
        position: "relative"
      }}>
        {/* Logo */}
        <a href="/" className="logo" style={{ 
          display: "flex", 
          alignItems: "center", 
          textDecoration: "none",
          color: "#6366f1",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          <i className="fas fa-gamepad" style={{ marginRight: "8px" }}></i>
          GameRate
        </a>

        {/* Search input */}
        <div style={{ position: "relative", flex: "0 0 auto" }}>
          <input
            type="text"
            placeholder="Pretraži korisnike..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              borderRadius: "20px",
              border: "1px solid #d1d5db",
              width: "300px",
              outline: "none",
              backgroundColor: "#f9fafb"
            }}
          />
          
          {/* Dropdown rezultata pretrage */}
          {searchResults.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                right: "0",
                background: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "8px",
                marginTop: "4px",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 1000,
                padding: "0",
                listStyle: "none",
                border: "1px solid #e5e5e5"
              }}
            >
              {searchResults.map(user => (
                <li
                  key={user.id}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    borderBottom: "1px solid #f0f0f0",
                    fontSize: "14px"
                  }}
                  onClick={() => {
                    setShowWishlist(true);
                    setSearchQuery("");
                    setSearchResults([]);
                    navigate(`/user/${user.id}`);
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#f8f9fa"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
                >
                  {user.ime} {user.prezime} ({user.email})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* User profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            onClick={() => setShowEdit(true)}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "8px",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f4f6"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            title="Izmeni profil"
          >
            <img
              src={currentUser.profilna_url || "https://ui-avatars.com/api/?name=" + currentUser.ime}
              alt="profilna"
              style={{ 
                width: "32px", 
                height: "32px", 
                borderRadius: "50%", 
                objectFit: "cover", 
                marginRight: "8px" 
              }}
            />
            <div>
              <div style={{ 
                fontWeight: "600", 
                fontSize: "14px", 
                color: "#374151" 
              }}>
                {currentUser.ime} {currentUser.prezime}
              </div>
              <div style={{ 
                color: "#6b7280", 
                fontSize: "12px" 
              }}>
                {currentUser.email}
              </div>
            </div>
          </div>
          
          <button 
            className="btn btn-danger" 
            onClick={onLogout}
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              borderRadius: "6px"
            }}
          >
            Odjavi se
          </button>
        </div>
      </header>

      {showEdit && (
        <EditProfileModal
          currentUser={currentUser}
          token={token}
          onClose={() => setShowEdit(false)}
          onProfileUpdate={updateProfileLocal}
        />
      )}

      {showWishlist && (
        <WishlistModal
          wishlist={wishlist}
          onClose={() => setShowWishlist(false)}
          navigate={navigate}
        />
      )}

      <main style={{ padding: "32px" }}>
        {/* Main content header */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start", 
          marginBottom: "32px" 
        }}>
          <div>
            <h2 style={{ 
              margin: "0 0 8px 0", 
              fontSize: "28px", 
              fontWeight: "600",
              color: "#1f2937"
            }}>
              Dobrodošli, {currentUser.ime}!
            </h2>
            <p style={{ 
              margin: 0, 
              color: "#6b7280", 
              fontSize: "16px" 
            }}>
              Pregledajte najpopularnije igre i dodajte svoje ocjene
            </p>
          </div>
          
          {/* Filters and controls */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select
              value={filterGenre}
              onChange={e => setFilterGenre(e.target.value)}
              style={{ 
                padding: "8px 12px", 
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "14px"
              }}
            >
              <option value="">Svi žanrovi</option>
              {filterGenreOptions.map(zanr => (
                <option key={zanr} value={zanr}>{zanr}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ 
                padding: "8px 12px", 
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "14px"
              }}
            >
              <option value="">Sortiraj po</option>
              <option value="rating_desc">Ocjena (najviše prvo)</option>
              <option value="rating_asc">Ocjena (najniže prvo)</option>
              <option value="naziv_asc">Naziv (A-Z)</option>
              <option value="naziv_desc">Naziv (Z-A)</option>
            </select>

            <button
              className="btn btn-secondary"
              onClick={() => setShowWishlist(true)}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                borderRadius: "6px",
                backgroundColor: "#10b981",
                color: "white",
                border: "none"
              }}
            >
              Wishlist
            </button>
          </div>
        </div>

        {isAdmin && (
          <form onSubmit={handleAdd} className="add-game-form">
            <h3>Dodaj novu igru</h3>
            <input
              type="text"
              placeholder="Naziv"
              value={newGame.naziv}
              onChange={(e) =>
                setNewGame({ ...newGame, naziv: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Žanr"
              value={newGame.zanr}
              onChange={(e) =>
                setNewGame({ ...newGame, zanr: e.target.value })
              }
              required
            />
            <input
              type="url"
              placeholder="URL slike"
              value={newGame.slika_url}
              onChange={(e) =>
                setNewGame({ ...newGame, slika_url: e.target.value })
              }
              required
            />
            <input
              type="url"
              placeholder="URL za kupovinu"
              value={newGame.kupi_url}
              onChange={(e) =>
                setNewGame({ ...newGame, kupi_url: e.target.value })
              }
              required
            />
            <button type="submit" className="btn btn-primary">
              Sačuvaj igru
            </button>
          </form>
        )}

        <div className="games-grid">
          {filteredAndSortedGames.map((game) => {
            const inWishlist = wishlist.some(w => w.id === game.id);
            return (
              <div key={game.id} className="game-card-new">
                <div className="game-img-container" onClick={() => navigate(`/game/${game.id}`)}>
                  <img src={game.slika_url} alt={game.naziv} className="game-cover-new" />
                </div>
                <div className="game-body-new">
                  <h3>{game.naziv}</h3>
                  <span className="game-genre-new">{game.zanr}</span>
                  <div className="game-rating-row">
                    {renderStars(game.average)}
                  </div>
                  <div className="game-meta-new">
                    <button
                      className="btn-rate"
                      onClick={() => setSelectedGame(game)}
                    >
                      Ocijeni
                    </button>
                    <button
                      className="btn"
                      style={{ fontWeight: "bold", fontSize: "1.3em", color: inWishlist ? "#1db954" : "#555" }}
                      onClick={() => handleWishlistToggle(game.id, inWishlist)}
                      title={inWishlist ? "Ukloni iz wishliste" : "Dodaj u wishlistu"}
                    >
                      {inWishlist ? "✔" : "+"}
                    </button>
                    {isAdmin && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(game.id)}
                      >
                        Obriši
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {selectedGame && (
        <RatingModal
          game={selectedGame}
          currentUser={currentUser}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </>
  );
}
