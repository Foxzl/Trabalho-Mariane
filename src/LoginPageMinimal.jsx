import React, { useState } from 'react';
import './Style.css';

function LoginPageMinimal({ onGoToRegister }) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    setCpf(value);
  };

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cpf.length < 14 || password === '') {
      setError('Preencha todos os campos corretamente.');
=======
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (cpf.length < 14 || password === '') {
    setError('Preencha todos os campos corretamente.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Erro no login.');
>>>>>>> 577b6b4 (Validação de campos)
    } else {
      setError('');
      alert('Login realizado com sucesso!');
    }
<<<<<<< HEAD
  };
=======
  } catch (err) {
    setError('Erro ao conectar com o servidor.');
  }
};

>>>>>>> 577b6b4 (Validação de campos)

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="open-title">Bem-vindo à TechFit 💪</h1>
        <h2 className="minimal-title">Login</h2>
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={handleCpfChange}
          maxLength={14}
          inputMode="numeric"
          className="login_cad_input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login_cad_input"
          autocomplete="on"
        />
        {error && <div className="minimal-error">{error}</div>}
        <button type="submit" className="login-btn">Entrar</button>
        <button type="button" className="login-btn" style={{background:'#e0e0e0',color:'#222',marginTop:'8px'}} onClick={onGoToRegister}>
          Criar cadastro
        </button>
      </form>
    </div>
  );
}

export default LoginPageMinimal;
