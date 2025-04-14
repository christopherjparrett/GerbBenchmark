import React, { useState } from 'react';
import '../Styles/Profile.css';
import logo from '../assets/logo.png';
import userPic from '../assets/user.png';
import userDelete from '../assets/remove-user.png';
import logout from '../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import CookieKing from '../components/CookieKing.tsx';

function Profile() {
  const navigate = useNavigate();

    const goTo = (inputs: string) =>{
        navigate(`/${inputs}`);
    };
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const userData = localStorage.getItem('user_data');
  const user = JSON.parse(userData || '{}');
  const userName = user.name;

    async function doDeleteUser(event: any): Promise<void> {
        event.preventDefault();

        var obj = { _id: user.id };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('https://card.christopherjparrett.xyz/api/deleteUser',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.boolStatus) {//If the user is deleted, simply remove the user data and send them out to the home page
                alert(res.error);
                localStorage.removeItem("user_data")
                window.location.href = '/';
            }
            else {//if the user is not deleted, set the error message to display
                alert(res.error);
            }

        }
        catch (error: any) {
            alert(error.toString());
            return;
        }
    };

  return (
    <div id="profileDiv">
      <CookieKing />
      <nav>
        <img src={logo} className="logo" alt="logo" style={{ filter: 'invert(100%)' }} />

        <ul>
          <li><a onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Home</a></li>
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

            <a href="/" className="sub-menu-link" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
    // Clear the cookie
    localStorage.removeItem('user_data');
  }}>
              <img src={logout} alt="logout" />
              <p>Log Out</p>
              <span>  </span>
            </a>

            <a onClick={doDeleteUser} href="/" className="sub-menu-link">
                <img src={userDelete} alt="Delete User" />
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

