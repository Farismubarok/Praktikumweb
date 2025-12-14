import React from 'react';
import { Bell } from 'lucide-react';
import './navbar.css'; // Bagian: Import CSS

const Navbar = () => {
  return (
    <header className="top-navbar">
      <div className="navbar-left"></div>

      <div className="navbar-right">
        <button className="icon-btn-ghost">
          <Bell size={20} className="bell-icon" />
          <span className="notif-dot"></span>
        </button>
        
        <div className="profile-wrapper">
          <img 
            src="https://i.pravatar.cc/150?u=admin" 
            alt="Profile" 
            className="avatar"
          />
          <div className="profile-text">
            <span className="name">John Admin</span>
            <span className="role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;