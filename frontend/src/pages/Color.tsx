import React from 'react';
import Profile from '../components/Profile.tsx';
import CookieKing from '../components/CookieKing.tsx';
const Color: React.FC = () => {
  return (
    <div>
      <CookieKing />
      <Profile />
      <h1>Welcome to the Color Page!</h1>
    </div>
  );
};

export default Color;
