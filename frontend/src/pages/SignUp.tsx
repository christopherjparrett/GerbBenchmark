import PageTitle from '../components/PageTitle.tsx';
import React from 'react';
import Register from '../components/Register.tsx';
import { useNavigate } from 'react-router-dom';
import '../Styles/Logup.css';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

    const goTo = (inputs: string) =>{
        navigate(`/${inputs}`);
    };
  return (
    <div>
      <h1 id="signupBanner">Create Account</h1>
        <Register />
    </div>
  );
};

export default SignUp;
