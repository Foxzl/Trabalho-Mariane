import React, { useState } from 'react';
import './Style.css';
import { CgEye } from "react-icons/cg";
import { IoMdEyeOff } from "react-icons/io";




function RegisterPage({ onGoToLogin }) {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    if (cpf.length < 14 || name === '' || email === '' || password === '' || confirmPassword === '') {
      setError('Preencha todos os campos corretamente.');
      setSuccess('');
    } else if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      setSuccess('');
    } else {
      setError('');
      setSuccess('Cadastro realizado com sucesso!');
      setCpf('');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="minimal-title">Criar Cadastro</h2>
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
          type="text"
          placeholder="Nome"
          value={name}
          maxLength={50}
          onChange={(e) => setName(e.target.value)}
          className="login_cad_input"
          autocomplete="off"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login_cad_input"
          autocomplete="off"
        />
        <div style={{position:'relative'}}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login_cad_input"
            autoComplete="on"
            style={{paddingRight:'100px'}}
            
          />
          <button
            className="show-btn"
            type="button"
            style={{position:'absolute',right:'8px',top:'53%',transform:'translateY(-50%)',background:'none',border:'none',color:'#222',cursor:'pointer',fontSize:'20px',padding:4}}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <IoMdEyeOff /> : <CgEye />}
          </button>
        </div>
        <div style={{position:'relative'}}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="login_cad_input"
            autoComplete="on"
            style={{paddingRight:'100px'}}
            
          />
          <button
            className="show-btn"
            type="button"
            style={{position:'absolute',right:'8px',top:'53%',transform:'translateY(-50%)',background:'none',border:'none',color:'#222',cursor:'pointer',fontSize:'20px',padding:4}}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <IoMdEyeOff /> : <CgEye />}
          </button>
        </div>
        {error && <div className="minimal-error">{error}</div>}
        {success && <div style={{color:'#388e3c',fontSize:'13px',textAlign:'center'}}>{success}</div>}
        <button type="submit" className="login-btn">Cadastrar</button>
        <button type="button" className="login-btn" style={{background:'#e0e0e0',color:'#222',marginTop:'8px'}} onClick={onGoToLogin}>
          Voltar para login
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
