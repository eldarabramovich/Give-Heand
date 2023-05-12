import React, { useState, useContext } from 'react'; 
import Menubar from './Menubar';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import Popup from './Popup';
import logo from '../assets/LOGO.svg';
import LoginForm from '../forms/LoginForm'
import SignupTabs from './SignupTabs'
import { auth } from "../config/firebaseClient";
import UserContext from '../UserContext';


const Navbar = () => {
  const { currentUser } = useContext(UserContext); // Get currentUser from UserContext
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleShowLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  const handleCloseLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  const handleShowRegisterPopup = () => {
    setRegisterPopupOpen(true);
  };

  const handleCloseRegisterPopup = () => {
    setRegisterPopupOpen(false);
  };

  function handleSignOut() {
    // Sign out the user and clear any server-side state
    auth.signOut()
      .then(() => {
        // User signed out successfully
        console.log('User signed out');
        navigate('/');
      })
      .catch((error) => {
        // An error occurred while signing out
        console.error('Error signing out:', error);
      });
  }

  function handleVolProfileClick() {
    if (currentUser.role === 'volunteer') {
      navigate(`/volunteerProfile/${currentUser.uid}`);
    } else {
      console.log("User role is not volunteer, cannot navigate to profile page.");
    }
  }

  function handleDashboardClick() {
    if (currentUser.role === 'admin') {
      navigate(`/Dashboard/${currentUser.uid}`);
    } else {
      console.log("User role is not admin, cannot navigate to profile page.");
    }
  }

  function handleAssoProfileClick() {
    if (currentUser.role === 'association') {
      navigate(`/associationProfile/${currentUser.uid}`);
    } else {
      console.log("User role is not association, cannot navigate to profile page.");
    }
  }


  return (
    <nav className="navbar">
      <div className="topbar">
        <div className="boxed">
          <a href="../">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
          </a>
          <div className="nav-items-container">
          {!currentUser?.role ? (
              <>
                <a onClick={handleShowRegisterPopup} className="nav-item register">להירשם</a>
                <a onClick={handleShowLoginPopup} className="nav-item login">להתחבר</a>
              </>
            ) : (
              <>
                {currentUser.role === 'volunteer' && (
                  <a className="nav-item register"
                    onClick={handleVolProfileClick}>הפרופיל שלי</a>
                )}
                {currentUser.role === 'admin' && (
                  <a  className="nav-item register"
                      onClick={handleDashboardClick}>דשבורד</a>
                )}
                {currentUser.role === 'association' && (
                  <a className="nav-item register"
                    onClick={handleAssoProfileClick}>דף האיגוד</a>
                )}
                <a onClick={handleSignOut} className="nav-item login">התנתקות</a>
              </>
            )}
            <Popup isOpen={loginPopupOpen} onClose={handleCloseLoginPopup}>
            <LoginForm
              onHide={handleCloseLoginPopup}
              onSignupLinkClick={() => {
                handleCloseLoginPopup();
                handleShowRegisterPopup();
              }}
            />
            </Popup>
            <Popup isOpen={registerPopupOpen} onClose={handleCloseRegisterPopup}>
              <SignupTabs />
            </Popup>
          </div>
        </div>
      </div>
      <Menubar />
    </nav>
  );
}

export default Navbar;