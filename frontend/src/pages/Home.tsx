import React from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../components/Home.tsx';
import '../Styles/Home.css';
import ColorPNG from '../assets/ColorsPNG.png'
import GerbPNG from '../assets/Gerbster.png'
const Home: React.FC = () => {
    const navigate = useNavigate();

    const goTo = (inputs: string) =>{
        navigate(`/${inputs}`);
    };



  return (
    <div className="Overlord" style={{backgroundImage: `url(${GerbPNG})`}}>
        <div className='Banner'>
            <h1>Welcome to the Home Page!</h1>
            <profile />
        </div>
      <button className = "HomeScreenButton" onClick={() => goTo('Color')}>
        <img src={ColorPNG} alt="Colors Button Logo" className="ButtonImage"></img>
        <div className='ButtonText'>Go to Color Test</div>
      </button>
      <button className = "HomeScreenButton" onClick={() => goTo('Typing')}>
        <img src={ColorPNG} alt="Typing Button Logo" className="ButtonImage"></img>
        <div className='ButtonText'>Go to Typing Test</div>
      </button>
      <button className = "HomeScreenButton" onClick={() => goTo('Reaction')}>
        <img src={ColorPNG} alt="Reaction Button Logo" className="ButtonImage"></img>
        <div className='ButtonText'>Go to Reaction Test</div>
      </button>
    </div>
  );
};

export default Home;
