import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import ColorPNG from '../assets/ColorsPNG.png'
const Home: React.FC = () => {
    const navigate = useNavigate();

    const goTo = (inputs: string) =>{
        navigate(`/${inputs}`);
    };


  return (
    <div className="Overlord">
        <div className='Banner'>
            <h1>Welcome to the Home Page!</h1>
        </div>
      <button className = "HomeScreenButton" onClick={() => goTo('Color')}>
        <img src={ColorPNG} alt="Colors Button Logo" className="ButtonImage"></img>
        <div className='ButtonText'>Go to Color Test</div>
      </button>
      <button onClick={() => goTo('Typing')}>Go to Typing Test</button>
      <button onClick={() => goTo('Reaction')}>Go to Reaction Test</button>
    </div>
  );
};

export default Home;