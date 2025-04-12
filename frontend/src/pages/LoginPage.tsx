import PageTitle from '../components/PageTitle.tsx';
import Login from '../components/Login.tsx';

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
