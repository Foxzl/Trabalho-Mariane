const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf TEXT UNIQUE,
    name TEXT,
    email TEXT,
    password TEXT
  )
`);


  const bcrypt = require('bcrypt');
  const cpf = '123.456.789-00';
  const password = '123456';
  

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return console.error(err);
    db.run('INSERT OR IGNORE INTO users (cpf, password) VALUES (?, ?)', [cpf, hash]);
  });
});

module.exports = db;
