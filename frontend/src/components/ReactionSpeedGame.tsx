import React, { useState } from 'react';

var _ud = localStorage.getItem('user_data');
if (_ud == null) _ud = '';
var ud = JSON.parse(_ud);
var userId = ud.id;

// Fetch logged in user
async function updateScore(score: number)
{
  const obj = { _id: userId, GameScore: score, gameId: 1 };
  const js  = JSON.stringify(obj);

  try
  {
    const response = await fetch(
      'https://card.christopherjparrett.xyz/api/changeScore',
      { method:'POST', body:js, headers:{ 'Content-Type':'application/json' } }
    );

    const res = JSON.parse(await response.text());
    if (res.error && res.error.length > 0)
      alert(res.error);
  }
  catch(err:any)
  {
    alert(err.toString());
  }
}

// Main
const ReactionSpeedGame: React.FC = () =>
{
  const [gameState, setGameState] = useState<'waiting'|'ready'|'click'|'done'>('waiting');
  const [message, setMessage] = useState('Click START to begin');
  const [startMs, setStartMs] = useState<number>(0);
  const [reaction, setReaction] = useState<number>(0);

  function startGame()
  {
    setGameState('ready');
    setMessage('Wait for green...');
    setReaction(0);

    // random delay
    const delay = Math.floor(Math.random()*3000) + 3000;
    setTimeout(() =>
    {
      setGameState('click');
      setMessage('CLICK NOW!');
      setStartMs(Date.now());
    }, delay);
  }

  async function handleClick()
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
      setMessage(`Your reaction time: ${rt} ms`);

      await updateScore(rt);
      window.location.href = '/Home';
    }
  }

  const boxStyle: React.CSSProperties =
  {
    width:'300px',
    height:'300px',
    margin:'auto',
    border:'2px solid white',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    cursor:'pointer',
    backgroundColor:
      gameState === 'click' ? 'green' :
      gameState === 'ready' ? 'red'   : '#222'
  };

  return (
    <div>
      { (gameState === 'waiting' || gameState === 'done') &&
        <button id="startButton" onClick={startGame}>START</button> }

      <div style={{ height:'20px' }} />

      <div style={boxStyle} onClick={handleClick}>
        <span style={{ color:'white', textAlign:'center' }}>{message}</span>
      </div>

      { reaction > 0 && <h2 style={{ color:'white' }}>Reaction: {reaction} ms</h2> }
    </div>
  );
};

export default ReactionSpeedGame;
