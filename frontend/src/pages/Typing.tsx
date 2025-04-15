import React from 'react';
import Profile from '../components/Profile.tsx';
import TypingGame from '../components/TypingGame.tsx';
import styles from '../Styles/Typing.css';
import CookieKing from '../components/CookieKing.tsx';
const Typing: React.FC = () => {
  return (
    <div className='stretch'>
      <CookieKing />
      <Profile />
      <TypingGame />
    </div>
  );
};

export default Typing;
