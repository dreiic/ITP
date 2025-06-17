import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/api/users/${id}`)
      .then(res => res.json())
      .then(setUser);

    fetch(`http://localhost:5001/api/wishlist/${id}`)
      .then(res => res.json())
      .then(setWishlist);
  }, [id]);

  if (!user) return <p>Učitavanje korisnika...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20, backgroundColor: "#fff", boxShadow: "0 0 12px rgba(0,0,0,0.1)", borderRadius: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img
          src={user.profilna_url || `https://ui-avatars.com/api/?name=${user.ime}+${user.prezime}&background=random&length=2`}
          alt="Profilna"
          style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", boxShadow: "0 0 8px rgba(0,0,0,0.15)" }}
        />
        <div>
          <h2 style={{ margin: 0 }}>{user.ime} {user.prezime}</h2>
          <p style={{ margin: "4px 0", color: "#555", fontSize: "0.9em" }}>{user.email}</p>
          <p style={{ margin: 0, color: "#777", fontStyle: "italic" }}>{user.opis || "Nema opisa"}</p>
        </div>
      </div>

      <h3 style={{ marginTop: 30, marginBottom: 12, borderBottom: "1px solid #ddd", paddingBottom: 6, fontWeight: 600 }}>
        Wishlist korisnika
      </h3>

      {wishlist.length === 0 ? (
        <p style={{ color: "#888", fontStyle: "italic" }}>Wishlist je prazna.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {wishlist.map(game => (
            <li
              key={game.id}
              style={{
                marginBottom: 12,
                padding: 12,
                backgroundColor: "#f9f9f9",
                borderRadius: 8,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              onClick={() => navigate(`/game/${game.id}`)}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e0e7ff")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
            >
              <i className="fas fa-gamepad" style={{ color: "#6366f1" }} title="Igra"></i>
              <strong>{game.naziv}</strong>
              <span style={{ color: "#6366f1", fontWeight: "600", fontSize: "0.85em", marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                <i className="fas fa-tag" title="Žanr"></i> {game.zanr}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
