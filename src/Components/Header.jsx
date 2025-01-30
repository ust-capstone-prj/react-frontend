import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';

const Header = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <nav className="header">
      <div className="logo">
        <span className="logo-text">ABM </span>
      </div>
      <div className="profile-container">
        <div 
          className="profile-icon" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{ fontSize: '40px' }}
        >
          <FaUserCircle size={40} />
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="username" style={{ fontSize: '24px' }}>{username}</div>
            <button className="logout-btn" onClick={handleLogout} style={{ fontSize: '20px' }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header; 