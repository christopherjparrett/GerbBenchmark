import React, { useState } from 'react';
import '../Styles/Profile.css';
import logo from '../assets/logo.png';
import userPic from '../assets/user.png';

function Profile() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div id="profileDiv">
      <nav>
        <img src={logo} className="logo" alt="logo" />

        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>

        <img
          src={userPic}
          className="user-pic"
          onClick={toggleMenu}
          alt="user"
        />

        <div className={`sub-menu-wrap ${menuOpen ? 'open-menu' : ''}`} id="subMenu">
          <div className="sub-menu">
            <div className="user-info">
              <img src={userPic} alt="user" />
              <h3>Matthew Gerber</h3>
            </div>
            <hr />

            <a href="#" className="sub-menu-link">
              <img src={logo} alt="logo" />
              <p>Log Out</p>
              <span> a </span>
            </a>

            <a href="#" className="sub-menu-link">
              <img src={logo} alt="logo" />
              <p>Delete User</p>
              <span> a </span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Profile;

