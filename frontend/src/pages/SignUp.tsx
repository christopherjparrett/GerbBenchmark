import PageTitle from '../components/PageTitle.tsx';
import React from 'react';
import Register from '../components/Register.tsx';
import { useNavigate } from 'react-router-dom';
import '../Styles/Logup.css';

const SignUp: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the SignUp Page!</h1>
      <PageTitle />
        <Register />
          <button className = "SignUpButton" onClick={() => goTo('LoginPage')}>
        <div className='ButtonText'>Return to Login</div>
              </button>
    </div>
  );
};

export default SignUp;
