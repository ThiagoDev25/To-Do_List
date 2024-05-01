import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    // Restante do código para o login...
  };

  const handleRegisterSubmit = async (e) => {
    // Restante do código para o registro...
  };

  return (
    <div className="login-page"> {/* Adicione a classe login-page */}
      <div className="login-form">
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleLoginSubmit}>
          <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="register-form">
        <h2>Registrar</h2>
        <form onSubmit={handleRegisterSubmit}>
          <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;