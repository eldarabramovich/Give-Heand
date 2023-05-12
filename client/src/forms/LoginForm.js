// LoginForm.js
import React, { useState, useContext } from 'react';
import '../css/Form.css';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import UserContext from '../UserContext';

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setCurrentUser } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    setEmailError(false);
    setPasswordError(false);

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data.message);
        props.onHide();
      
        // Merge the user's Auth profile and Firestore document into a single object
        const userData = {
          ...userCredential.user,
          ...data
        };
        
        setCurrentUser(userData);
        console.log('Current user: ', userData);
      } else {
        console.log("Login failed:", data.message);
      }      
    } catch (error) {
      console.error("Error logging in admin.", error);
      if (error.code === 'auth/wrong-password') {
        setPasswordError(true);
      } else if (error.code === 'auth/user-not-found') {
        setEmailError(true);
      } else {
        console.error('An error occurred:', error.message);
      }
    }
  }
  
  async function handleForgotPassword() {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully.");
    } catch (error) {
      console.error("Error sending password reset email.", error);
    }
  }
  
  return (    
    <div className="form">
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="email-label" htmlFor="email">.</label>
          <input className={`form-input${emailError ? ' error' : ''}`}
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
          <input className={`form-input${passwordError ? ' error' : ''}`}
            placeholder="סיסמה" 
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="form-btn" type="button" onClick={handleSubmit}>התחברות</button>
      </form>
      <div className="form-footer">
        <div className="links">
          <a onClick={handleForgotPassword}>שכחתי סיסמה</a>
          <a onClick={props.onSignupLinkClick}>אין לך חשבון? הירשם</a>
        </div>;
      </div>
    </div>
  );

}

export default LoginForm;