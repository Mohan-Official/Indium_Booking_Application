import React from 'react';
import './Navbar.css';
import  NotificationBell from "../assets/NotificationBell.svg"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">Book Meeting Rooms</a>
        <div className="navbar-menu">
          <img src={NotificationBell}/>
         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
