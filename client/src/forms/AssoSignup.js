import React, { useState } from 'react';
import '../css/Form.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AssoSignup({ onRegister }) {
  const [associationName, setassociationName] = useState('');
  const [associationrecruiterName, setassociationrecruiterName] = useState('');
  const [joinDate, setJoinDate] = useState(null); 
  const [recruiterMobilePhone, setPhoneNumber] = useState('');
  const [associationEmail, setassociationEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [dateError, setDateError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isAssociationValid = false;
    try {
      const response = await fetch('http://localhost:5000/associationsData');
      const associationsData = await response.json();
      const normalizeAssociationName = (str) =>
        str.replace(/\s+/g, ' ').replace(/(\(ע~ר\)|\(קא~ה\))/g, '').trim();

      const trimmedAssociationName = associationName.trim();
      const trimmedRegistrationDate = joinDate.toLocaleDateString('en-GB').replace(/\//g, '/');
      
      isAssociationValid = associationsData.some((record) => {
        const recordAssociationName = normalizeAssociationName(record['שם עמותה בעברית'].trim());
        const recordRegistrationDate = record['תאריך רישום עמותה'].trim();
        return (
          recordAssociationName === normalizeAssociationName(trimmedAssociationName) &&
          recordRegistrationDate === trimmedRegistrationDate
        );
      });
    } catch (error) {
      console.error('Error fetching associations data:', error);
    }

    if (isAssociationValid) {
      alert('done!');
      try {
        const response = await fetch("http://localhost:5000/signup/association", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ associationName, associationrecruiterName, associationEmail, recruiterMobilePhone, password }),
          });

        const data = await response.json();

        if (response.ok) {
          onRegister();
          console.log("Association registered successfully:", data.message);         
        } else {
          console.log("Association registration failed:", data.message);
        }
      } catch (error) {
        console.error("Error registering association.", error);
      }
    } else {
      setDateError(true);
      alert('!הרישום נכשל, שם העמותה או תאריך הרישום אינם תקפים.');
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
      
        <div>
          <label className="company-name" htmlFor="associationName">שם עמותה:</label>
          <input
            placeholder="שם העמותה"
            type="text"
            id="associationName"
            name="associationName"
            value={associationName}
            onChange={(e) => setassociationName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="first-name" htmlFor="associationrecruiterName">נציג עמותה:</label>
          <input
            placeholder="שם נציג העמותה"
            type="text"
            id="associationrecruiterName"
            name="associationrecruiterName"
            value={associationrecruiterName}
            onChange={(e) => setassociationrecruiterName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="date-label" htmlFor="joinDate">תאריך הצטרפות לאיגוד:</label>
          <DatePicker 
            className={`date-picker${dateError ? ' error' : ''}`}
            locale="he"
            id="joinDate"
            name="joinDate"
            selected={joinDate}
            onChange={(date) => setJoinDate(date)}
            placeholderText="תאריך הצטרפות לאיגוד"
            dateFormat="dd/MM/yyyy"            
          />
        </div>
        <div>
          <label className="phone-label" htmlFor="phoneNumber">מספר פלאפון:</label>
          <input
            placeholder="טלפון נייד"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={recruiterMobilePhone}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
                value={associationEmail}
                onChange={(e) => setassociationEmail(e.target.value)}
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
            value={password}
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
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button className='form-btn' type="submit">הרשמה</button>
      </form>
    </div>
  );
}

export default AssoSignup;
