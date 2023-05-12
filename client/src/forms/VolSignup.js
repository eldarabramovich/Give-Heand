import React, { useState } from 'react';
import '../css/Form.css';

function VolSignup({ onRegister }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordVerification) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, mobilePhone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Volunteer registered successfully:", data.message);
        onRegister();
      } else {
        console.log("Volunteer registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error registering volunteer.", error);
    }
  };
    
    return (
        <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="first-name" htmlFor="VolName">שם פרטי:</label>
            <input
              placeholder="שם פרטי"
              type="text"
              id="VolName"
              name="VolName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="last-name" htmlFor="VolLastName">שם משפחה</label>
            <input
              placeholder="שם משפחה"
              type="text"
              id="VolLastName"
              name="VolLastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="phone-label" htmlFor="phoneNumber">מספר פלאפון:</label>
            <input
              placeholder="טלפון נייד"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={mobilePhone}
              onChange={(e) => setMobilePhone(e.target.value)}
              required
            />
          </div>
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
            <label className="password-label" htmlFor="password">סיסמא:</label>
            <input
              placeholder="בחר סיסמה"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="password-label" htmlFor="passwordConfirmation">סיסמא חוזרת:</label>
            <input
              placeholder="הקלד שוב סיסמה"
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              onChange={(e) => setPasswordVerification(e.target.value)}
              required
            />
          </div>
          <button className='form-btn' type="submit">הרשמה</button>
        </form>
      </div>
    );
}
export default VolSignup;