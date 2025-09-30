
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import LoginPageMinimal from './LoginPageMinimal';
import RegisterPage from './RegisterPage';
import './Style.css';
import MainPage from './MainPage';
import { MdAdminPanelSettings } from 'react-icons/md';


function App() {
  const [screen, setScreen] = useState(() => 'login');
  return screen === 'login' ? (
    <LoginPageMinimal onGoToRegister={() => setScreen('register')} />
  ) : (
    <RegisterPage onGoToLogin={() => setScreen('login')} />
  );
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
