// LoginForm.js
import React, { useState } from 'react';
import '../css/LoginForm.css';
import email_icon from '../assets/cd-icon-email.svg';
import password_icon from '../assets/cd-icon-password.svg';
import username from '../assets/cd-icon-username.svg'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform authentication logic here.
  };

  return (
    
    <div className="login-form">
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="email-label" htmlFor="email">.</label>
          <input className="form-input"
            placeholder="אימייל"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="password-label" htmlFor="password">.</label>
          <input className="form-input"
            placeholder="סיסמה" 
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="form-btn" type="submit">התחברות</button>
      </form>
      <div className="links">
        <a href="#">שחכתי סיסמא</a>
        <a href="#">אין לך חשבון? הירשם</a>
      </div>
    </div>
  );
}

export default LoginForm;