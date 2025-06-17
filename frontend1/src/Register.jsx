// src/Register.jsx
import { useState } from "react";

function Register({ onRegister }) {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");
  const [poruka, setPoruka] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska("");
    setPoruka("");

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ime, prezime, email, lozinka }),
      });
      const data = await res.json();

      if (!res.ok) {
        // server vraća { error: "..." }
        setGreska(data.error || "Greška pri registraciji.");
      } else {
        setPoruka("Uspešno registrovani! Možete se sada prijaviti.");
        // reset forme
        setIme("");
        setPrezime("");
        setEmail("");
        setLozinka("");
        // nakon kratke pauze, pozovi callback da se vratiš na login
        setTimeout(onRegister, 1500);
      }
    } catch (err) {
      setGreska("Greška na serveru.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Registracija</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ime</label>
            <input
              type="text"
              className="form-control"
              placeholder="Unesite ime"
              value={ime}
              onChange={(e) => setIme(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Prezime</label>
            <input
              type="text"
              className="form-control"
              placeholder="Unesite prezime"
              value={prezime}
              onChange={(e) => setPrezime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email adresa</label>
            <input
              type="email"
              className="form-control"
              placeholder="Unesite email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Lozinka</label>
            <input
              type="password"
              className="form-control"
              placeholder="Unesite lozinku"
              value={lozinka}
              onChange={(e) => setLozinka(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Registruj se
          </button>
          {greska && <p style={{ color: "red", marginTop: "10px" }}>{greska}</p>}
          {poruka && <p style={{ color: "green", marginTop: "10px" }}>{poruka}</p>}
        </form>
        <div className="auth-footer">
          Već imate nalog?{" "}
          <a
            href="#"
            className="auth-link"
            onClick={(e) => {
              e.preventDefault();
              onRegister();
            }}
          >
            Prijavite se
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
