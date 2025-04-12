import PageTitle from '../components/PageTitle.tsx';
import Login from '../components/Login.tsx';

const LoginPage = () =>
{

    return(
      <div>
        <PageTitle />
        <Login />
      </div>
      <div>
        <button onClick={() => goTo('SignUp')}>Create an Account</button>
      </div>
    );
};

export default LoginPage;
