import React, { useState } from 'react';

function Profile() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div id="profileDiv">
      <nav>
        <img src="../assets/logo.png" className="logo" alt="logo" />

        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>

        <img
          src="../assets/user.png"
          className="user-pic"
          onClick={toggleMenu}
          alt="user"
        />

        <div className={`sub-menu-wrap ${menuOpen ? 'open-menu' : ''}`} id="subMenu">
          <div className="sub-menu">
            <div className="user-info">
              <img src="../assets/user.png" alt="user" />
              <h3>Matthew Gerber</h3>
            </div>
            <hr />

            <a href="#" className="sub-menu-link">
              <img src="../assets/logo.png" alt="logo" />
              <p>Log Out</p>
              <span> a </span>
            </a>

            <a href="#" className="sub-menu-link">
              <img src="../assets/logo.png" alt="logo" />
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

