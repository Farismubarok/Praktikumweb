import React from 'react';
import { Search, Bell } from 'lucide-react';
import './navbar.css'; // Import CSS terpisah

const Navbar = () => {
  return (
    <header className="top-navbar">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search employees..." 
          className="search-input"
        />
      </div>

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