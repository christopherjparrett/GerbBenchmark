import PageTitle from '../components/PageTitle.tsx';
import Login from '../components/Login.tsx';
import '../Styles/Logup.css';

const LoginPage: React.FC = () => {


  return (
    <div className='stretch'>
      <PageTitle />
      <Login />
    </div>
  );
};

export default LoginPage;
