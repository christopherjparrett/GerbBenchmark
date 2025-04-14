import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CookieKing() {
  const navigate = useNavigate();

    const goTo = (inputs: string) =>{
        navigate(`/${inputs}`);
    };
  const userData = localStorage.getItem('user_data');
  if(!userData){
    goTo('');
  }
  return (
    <></>
  );
}

export default CookieKing;

