const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.login = (req, res) => {
  const { email, lozinka } = req.body;
  db.query("SELECT * FROM korisnik WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Greška u bazi." });
    if (result.length === 0) return res.status(401).json({ message: "Email ne postoji." });

    const korisnik = result[0];
    // Direktno poređenje lozinke (bez bcrypt)
    if (lozinka !== korisnik.lozinka) {
      return res.status(401).json({ message: "Pogrešna lozinka." });
    }

    const token = jwt.sign(
      { id: korisnik.id, role: korisnik.role },
      "tajna",
      { expiresIn: "2h" }
    );

    res.json({
      token,
      korisnik: {
        id: korisnik.id,
        ime: korisnik.ime,
        prezime: korisnik.prezime,
        email: korisnik.email,
        role: korisnik.role
      }
    });
  });
};

exports.register = (req, res) => {
  const { ime, prezime, email, lozinka } = req.body;
  // NEMOJ HASHIRATI - čuvaj plain text za razvoj (samo za test)
  db.query(
    "INSERT INTO korisnik (ime, prezime, email, lozinka) VALUES (?, ?, ?, ?)",
    [ime, prezime, email, lozinka],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Greška pri registraciji." });
      res.status(201).json({ message: "Korisnik registrovan!" });
    }
  );
};
