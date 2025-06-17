// config/db.js
const mysql = require("mysql");
const db = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "",          // ili tvoja lozinka za MySQL
  database : "gamrate"    // <— ovdje mora stajati točno ime tvoje baze
});

db.connect((err) => {
  if (err) {
    console.error("❌ Greška pri povezivanju na bazu:", err);
    process.exit(1);
  }
  console.log("✅ Povezan sa MySQL bazom (XAMPP)!");
});

module.exports = db;
