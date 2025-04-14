import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile.tsx';
import '../Styles/Home.css';
import ColorPNG from '../assets/ColorsPNG.png'
import TypingPNG from '../assets/TypingPNG.png'
import ReactionPNG from '../assets/ReactionPNG.png'
import CookieKing from '../components/CookieKing.tsx';
const Home: React.FC = () => {
    const navigate = useNavigate();

    const goTo = (inputs: string) =>{
        navigate(`/${inputs}`);
    };



  return (
    <div>
        <CookieKing />
        <Profile />
        <div className="Overlord">
            <div className='Banner'>
                <h1>Welcome to the Home Page!</h1>
            </div>
            <div className='AllButtons'>
                    <button className = "HomeScreenButton" onClick={() => goTo('Color')}>
                        <div className="ButtonFront">
                            <img src={ColorPNG} alt="Colors Button Logo" className="ButtonImage"></img>
                            <div className='ButtonText'>Color Comprehension Test</div>
                        </div>
                        <div className="ButtonBack">
                            <div className='ButtonText'>
                                Test your color recognition skills!
                                Multiple squares will appear on the screen and one will be slightly different.
                                Try to identify the different square and get as many points as you can!
                            </div>
                        </div>
                    </button>
                    <button className = "HomeScreenButton" onClick={() => goTo('Typing')}>
                    <div className="ButtonFront">
                            <img src={TypingPNG} alt="Colors Button Logo" className="ButtonImage"></img>
                            <div className='ButtonText'>Typing Speed Test</div>
                        </div>
                        <div className="ButtonBack">
                            <div className='ButtonText'>
                                Test your Typing skills!<br></br>
                                A sentence will appear on the screen and you will have to type it as fast as you can!<br></br>
                                Wrong inputs will be penalized, so be careful!
                            </div>
                        </div>
                    </button>
                    <button className = "HomeScreenButton" onClick={() => goTo('Reaction')}>
                    <div className="ButtonFront">
                            <img src={ReactionPNG} alt="Colors Button Logo" className="ButtonImage"></img>
                            <div className='ButtonText'>Reaction Time Test</div>
                        </div>
                        <div className="ButtonBack">
                            <div className='ButtonText'>
                                How fast can you react?<br></br>
                                The screen will change after some time and you are supposed to press the button as fast as you can!<br></br>
                                The faster you react, the better!
                            </div>
                        </div>
                    </button>
            </div>
        </div>
    </div>
  );
};

export default Home;
