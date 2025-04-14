import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CookieKing() {
  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem('user_data');
    if (!userData) {
      navigate('/');
      return;
    }
  }, [navigate]);

  // Return null since we don't need to render anything
  return null;
}

export default CookieKing;

