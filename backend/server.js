const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./database');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { cpf, password } = req.body;

  if (!cpf || !password) {
    return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
  }

  db.get('SELECT * FROM users WHERE cpf = ?', [cpf], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor.' });
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado.' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Erro ao verificar senha.' });
      if (!isMatch) return res.status(401).json({ error: 'Senha incorreta.' });

      res.json({ message: 'Login bem-sucedido!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.post('/register', (req, res) => {
  const { cpf, name, email, password } = req.body;

  if (!cpf || !name || !email || !password) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  // Verifica se o CPF já está registrado
  db.get('SELECT * FROM users WHERE cpf = ?', [cpf], (err, row) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor.' });
    if (row) return res.status(409).json({ error: 'CPF já cadastrado.' });

    // Criptografa a senha e insere o usuário
    const bcrypt = require('bcrypt');
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: 'Erro ao criptografar a senha.' });

      db.run(
        'INSERT INTO users (cpf, name, email, password) VALUES (?, ?, ?, ?)',
        [cpf, name, email, hash],
        (err) => {
          if (err) return res.status(500).json({ error: 'Erro ao salvar usuário.' });
          res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        }
      );
    });
  });
});
