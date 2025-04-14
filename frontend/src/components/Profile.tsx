import React, { useState } from 'react';
import '../Styles/Profile.css';
import logo from '../assets/logo.png';
import userPic from '../assets/user.png';

function Profile() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const userData = localStorage.getItem('user_data');
  const user = JSON.parse(userData || '{}');
  const userName = user.name;
  return (
    <div id="profileDiv">
      <nav>
        <img src={logo} className="logo" alt="logo" style={{ filter: 'invert(100%)' }} />

        <ul>
          <li><a onClick={() => navigate('')} style={{ cursor: 'pointer' }}>Home</a></li>
        </ul>

        <img
          src={userPic}
          className="user-pic"
          onClick={toggleMenu}
          alt="user"
          style={{ filter: 'invert(100%)' }}
        />

        <div className={`sub-menu-wrap ${menuOpen ? 'open-menu' : ''}`} id="subMenu">
          <div className="sub-menu">
            <div className="user-info">
              <img src={userPic} alt="user" />
              <h3>{userName}</h3>
            </div>
            <hr />

            <a href="#" className="sub-menu-link">
              <img src={logo} alt="logo" />
              <p>Log Out</p>
              <span>  </span>
            </a>

            <a href="#" className="sub-menu-link">
              <img src={logo} alt="logo" />
              <p>Delete User</p>
              <span>  </span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Profile;

