// RegisterForm.js
import React, { useState } from 'react';
import '../css/RegisterForm.css';

function RegisterForm() {
  const [organizationName, setOrganizationName] = useState('');
  const [representative, setRepresentative] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform registration logic here.
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="organizationName">שם עמותה:</label>
        <input
          type="text"
          id="organizationName"
          name="organizationName"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="representative">נציג עמותה:</label>
        <input
          type="text"
          id="representative"
          name="representative"
          value={representative}
          onChange={(e) => setRepresentative(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="joinDate">תאריך הצטרפות לאיגוד:</label>
        <input
          type="date"
          id="joinDate"
          name="joinDate"
          value={joinDate}
          onChange={(e) => setJoinDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">מספר פלאפון:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">סיסמא:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="passwordConfirmation">סיסמא חוזרת:</label>
        <input
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
      </div>
      <button type="submit">הרשמה</button>
    </form>
  );
}

export default RegisterForm;
