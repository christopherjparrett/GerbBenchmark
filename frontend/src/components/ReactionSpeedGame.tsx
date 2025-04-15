import React, { useState } from 'react';
import Leaderboard from './Leaderboard';

// Fetch logged in user
let userId = -1;
try {
  const ud = JSON.parse(localStorage.getItem('user_data') || '{}');
  userId = ud.id ?? -1;
} catch {}

async function updateScore(score: number)
{
  const obj = { _id: userId, GameScore: score, gameId: 2 };
  const js  = JSON.stringify(obj);

  try
  {
    const response = await fetch(
      'https://card.christopherjparrett.xyz/api/changeScore',
      { method:'POST', body:js, headers:{ 'Content-Type':'application/json' } }
    );

    const res = JSON.parse(await response.text());
    if (res.error && res.error.length > 0)
      console.log(res.error);
  }
  catch(err:any)
  {
    console.log(err.toString());
  }
}

const getFeedback = (rt: number): string => {
  if (rt < 250) return 'Good job! That was really quick!';
  if (rt < 450) return 'That was pretty good! It could be a little faster.';
  return 'Oof, that was pretty slow. You can do better!';
}

// Main
const ReactionSpeedGame: React.FC = () =>
{
  const [gameState, setGameState] = useState<'waiting'|'ready'|'click'|'done'>('waiting');
  const [message, setMessage] = useState(
    'Click the START button to begin.\nWhen the red box turns green, click as fast as you can.'
  );
  const [startMs, setStartMs] = useState<number>(0);
  const [reaction, setReaction] = useState<number | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  // Handlers
  const startGame = () =>
  {
    setGameState('ready');
    setMessage('Wait for green...');
    setReaction(null);
    setShowLeaderboard(false);

    // random delay
    const delay = Math.floor(Math.random() * 3000) + 3000;
    setTimeout(() =>
    {
      setGameState('click');
      setMessage('CLICK NOW!');
      setStartMs(Date.now());
    }, delay);
  }

  const handleClick = async () =>
  {
    if (gameState === 'ready')
    {
      setGameState('done');
      setMessage('Too soon! Try again.');
      return;
    }

    if (gameState === 'click')
    {
      const rt = Date.now() - startMs;
      setReaction(rt);
      setGameState('done');
      setMessage(getFeedback(rt));
      await updateScore(rt);
      setShowLeaderboard(true);
    }
  }

  // Visuals
  const wrapper: React.CSSProperties = {
    display:'flex', flexDirection:'column', 
    alignItems:'center', justifyContent:'center', 
    textAlign:'center', gap:'20px', minHeight:'calc(100vh - 120px)'
  };

  const box: React.CSSProperties = {
    width:'300px', height:'300px',
    border:'2px solid white',
    display:'flex', alignItems:'center', justifyContent:'center',
    textAlign:'center', whiteSpace:'pre-line',
    cursor: gameState==='click' || gameState==='ready' ? 'pointer' : 'default',
    backgroundColor:
      gameState==='click' ? 'green' :
      gameState==='ready' ? 'red' : '#222'
  };

  return (
    <div style={wrapper}>
      {}
      {reaction !== null && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{color:'white'}}>Reaction: {reaction} ms</h2>
          {showLeaderboard && (
            <Leaderboard gameId={2} gameLabel="ReactionScore" show={true} />
          )}
          </div>
      )}

      {}
      <div style={box} onClick={handleClick}>
        {gameState==='waiting' || gameState==='done' ? (
          <div>
            <p>{message}</p>
            <button
              id="startButton"
              onClick={startGame}
              style={{marginTop:'10px'}}
            >
              START
            </button>
          </div>
        ) : (
          <span>{message}</span>
        )}
      </div>
    </div>
  );
};

export default ReactionSpeedGame;
