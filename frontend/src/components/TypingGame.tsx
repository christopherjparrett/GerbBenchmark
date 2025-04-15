import { useState, useRef, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { generate } from "random-words";
import '../Styles/Typing.css';
import Leaderboard from './Leaderboard';
function TypingGame() {

    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = "";
    var ud = JSON.parse(_ud);
    var userId = ud.id;

    const {
        seconds,
        minutes,
        start,
        pause
    } = useStopwatch({ autoStart: false, interval: 20 });
    const [message, setMessage] = useState('');
    const [output, setOutput] = useState('');
    const [counter, setCounter] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [finalWPM, setFinalWPM] = useState<number | null>(null);
    const [finalMistakes, setFinalMistakes] = useState<number>(0);

    const index = useRef(0);
    const length = useRef(0);
    const mistakes = useRef(0);
    const msg = useRef('');
    const stime = useRef(0);

    const formatTime = (time: any) => {
        return String(time).padStart(2, '0')
    }

    useEffect(() => {
        return() => {
            document.removeEventListener("keydown", checkChar);
        }
    }, []);

    function startGame(e: any): void {
        e.preventDefault();
        document.getElementById("startButton")?.style.setProperty("display", "none");
        document.getElementById("scoreDisplay")?.style.setProperty("visibility", "visible");
        generateMessage();
        start();
        stime.current = Date.now();
    }

    function generateMessage(): void {
        let arr = generate(30);
        if (Array.isArray(arr)) {
            setMessage(arr.join(" ") + ".");
            msg.current = arr.join(" ") + ".";
            length.current = msg.current.length;
        }
        document.getElementById("output")?.style.setProperty("border", "1px solid white");
        document.addEventListener("keydown", checkChar)
    }

    function checkChar(e: any): void {
        if (e.key != msg.current.charAt(index.current)) {
            document.getElementById('gameDisplay')?.animate({ backgroundColor: "red" }, 200);
            setCounter(++mistakes.current);
        }
        else {
            index.current++;
            setMessage(msg.current.substring(index.current));
            setOutput(msg.current.substring(0, index.current));
            if (index.current == length.current) {
                pause();
                let WPM = (length.current / 5 / (Date.now() - stime.current + 250 * mistakes.current) * 60000).toFixed(2);
                console.log("You won! WPM: " + WPM);
                updateScore(parseFloat(WPM));
                const final = parseFloat(WPM);
                setFinalWPM(final);
                setFinalMistakes(mistakes.current);
                setGameOver(true);
                //window.location.href = '/Home';
            }
        }

    }

    async function updateScore(score: number) {
        //Do API call here
        var obj = { _id: userId, GameScore: score, gameId: 3 };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('https://card.christopherjparrett.xyz/api/changeScore',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            console.log(res.error);
        }
        catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div id="typing" style={{ textAlign: 'center', padding: '40px' }}>
          {gameOver ? (
            <div>
              <h2>🎉 You Finished!</h2>
              <p style={{ fontSize: '24px' }}>WPM: <strong>{finalWPM}</strong></p>
              <p style={{ fontSize: '24px' }}>Mistakes: <strong>{finalMistakes}</strong></p>
              <Leaderboard gameId={3} gameLabel="TypingScore" show={true} />
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  fontSize: '18px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Play Again
              </button>
            </div>
          ) : (
            <>
              <button id="startButton" onClick={startGame} style={{ zIndex: 1 }}>Start</button>
              <div id="scoreDisplay">
                <div style={{ fontSize: '100px' }}>
                  <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
                </div>
                <div style={{ fontSize: '50px', paddingBottom: '20px' }}>
                  Mistakes: {counter}
                </div>
              </div>
              <div id="gameDisplay">
                <div id="message"><mark>{output}</mark>{message}</div>
                <div id="output">{output}</div>
              </div>
            </>
          )}
        </div>
      )
      
}

export default TypingGame
