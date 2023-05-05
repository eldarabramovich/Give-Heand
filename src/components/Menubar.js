import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Menubar.css';

const Menubar = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="menu-bar boxed">
        <ul>
          <li onClick={() => handleClick('/')}>ראשי</li>
          <li onClick={() => handleClick('/about')}>אודות</li>
          <li onClick={() => handleClick('/Associations')}>עמותות</li>
          <li onClick={() => handleClick('/events')}>אירועים</li>
          <li onClick={() => handleClick('/contact')}>צרו קשר</li>      
        </ul>
    </div>
  );
};

export default Menubar;