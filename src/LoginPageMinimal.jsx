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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cpf.length < 14 || password === '') {
      setError('Preencha todos os campos corretamente.');
    } else {
      setError('');
      alert('Login realizado com sucesso!');
    }
  };

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
