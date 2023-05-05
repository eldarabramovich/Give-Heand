import React, { useState } from 'react';
import Menubar from './Menubar';
import '../css/Navbar.css';
import Popup from './Popup';
import logo from '../assets/LOGO.svg';
import LoginForm from '../forms/LoginForm'
import RegisterForm from '../forms/RegisterForm'

const Navbar = () => {
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);

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
            <a onClick={handleShowRegisterPopup} className="nav-item register">להירשם</a>
            <a onClick={handleShowLoginPopup} className="nav-item login">להתחבר</a>
            <Popup isOpen={loginPopupOpen} onClose={handleCloseLoginPopup}>
              <LoginForm />
            </Popup>
            <Popup isOpen={registerPopupOpen} onClose={handleCloseRegisterPopup}>
              <RegisterForm />
             </Popup>
          </div>
        </div>
      </div>
      <Menubar />
    </nav>
  );
};

export default Navbar;