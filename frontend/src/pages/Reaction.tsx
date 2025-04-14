import React from 'react';
import Profile from '../components/Profile.tsx';
import CookieKing from '../components/CookieKing.tsx';
import ReactionSpeedGame from '../components/ReactionSpeedGame';

const Reaction: React.FC = () => {
  return (
    <div>
      <CookieKing />
      <Profile />

      <h1>Welcome to the Reaction Page!</h1>

      <ReactionSpeedGame />
    </div>
  );
};

export default Reaction;
