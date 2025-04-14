import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CookieKing() {
  const navigate = useNavigate();

    const goTo = (inputs: string) =>{
        navigate(`/${inputs}`);
    };
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const userData = localStorage.getItem('user_data');
  if(!userData){
    goTo('login');
  }
  return (
    <></>
  );
}

export default CookieKing;

