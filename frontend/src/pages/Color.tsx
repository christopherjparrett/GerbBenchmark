import React from 'react';
import Profile from '../components/Profile.tsx';
import CookieKing from '../components/CookieKing.tsx';
import ColorGame from '../components/ColorGame.tsx';
const Color: React.FC = () => {
  return (
    <div>
      <CookieKing />
      <Profile />
      <ColorGame />
    </div>
  );
};

export default Color;
