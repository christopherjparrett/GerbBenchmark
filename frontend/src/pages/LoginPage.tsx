import PageTitle from '../components/PageTitle.tsx';
import Login from '../components/Login.tsx';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const navigate = useNavigate();

    const goTo = (inputs: string) =>{
        navigate(`/${inputs}`);
    };

const LoginPage = () =>
{

    return(
      <div>
        <PageTitle />
        <Login />
          <button className = "SignUpButton" onClick={() => goTo('SignUp')}>
        <div className='ButtonText'>Create an Account</div>
              </button>
      </div>
    
    );
};

export default LoginPage;
