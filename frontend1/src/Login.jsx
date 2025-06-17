import { useState } from "react";

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lozinka }),
      });

      const data = await res.json();

      if (!res.ok) {
        setGreska(data.message || "Greška pri loginu.");
      } else {
        setGreska("");
        localStorage.setItem("token", data.token);
        localStorage.setItem("korisnik", JSON.stringify(data.korisnik));
        onLogin(data.korisnik, data.token);
      }
    } catch (err) {
      setGreska("Greška na serveru.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Prijava</h2>
        <form onSubmit={handleSubmit}>
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
            Prijavi se
          </button>
          {greska && <p style={{ color: "red", marginTop: "10px" }}>{greska}</p>}
        </form>
        <div className="auth-footer">
          Nemate nalog?{" "}
          <a
            href="#"
            className="auth-link"
            onClick={(e) => {
              e.preventDefault();
              onSwitch();
            }}
          >
            Registrujte se
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
