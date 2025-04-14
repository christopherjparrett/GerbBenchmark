import React from 'react';
import Profile from '../components/Profile.tsx';
import TypingGame from '../components/TypingGame.tsx';
import '../Styles/Typing.css';
const Typing: React.FC = () => {
  return (
    <div>
      <Profile />
      <TypingGame />
    </div>
  );
};

export default Typing;
