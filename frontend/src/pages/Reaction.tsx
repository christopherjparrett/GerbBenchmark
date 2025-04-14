import React from 'react';
import Profile from '../components/Profile.tsx';
import CookieKing from '../components/CookieKing.tsx';

const Reaction: React.FC = () => {
  return (
    <div>
      <CookieKing />
      <Profile />
      <h1>Welcome to the Reaction Page!</h1>
    </div>
  );
};

export default Reaction;
