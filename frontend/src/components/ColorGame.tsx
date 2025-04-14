import { useState, useRef} from 'react';
import { useTimer } from 'react-timer-hook';
import '../Styles/Color.css'
import correct from '../assets/correct.mp3'
import over from '../assets/game-over.mp3'

function ColorGame() {
    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = "";
    var ud = JSON.parse(_ud);
    var userId = ud.id;

    let time = new Date();
    time.setSeconds(time.getSeconds() + 5);
    const {
        milliseconds,
        seconds,
        pause,
        restart,
    } = useTimer({ expiryTimestamp: time, autoStart: false, interval: 20, onExpire: () => endGame()});
    const score = useRef(0);
    const round = useRef(0);
    const buttons = [4, 6, 8, 9, 12, 16];
    const ids = [...Array(16).keys()];
    const rand = useRef(0);
    const stime = useRef(Date.now());
    const [dispScore, setScore] = useState(0);
    const [dispRound, setRound] = useState(0);

    const playCorrect = () => {
        new Audio(correct).play();
    }
    const playOver = () => {
        new Audio(over).play();
    }

    const formatTime = (time: any) => {
        return String(time).padStart(3, '0')
    }

    function startGame(e: any): void {
        e.preventDefault();
        document.getElementById("startButton")?.style.setProperty("display", "none");
        document.getElementById("scoreDisplay")?.style.setProperty("visibility", "visible");
        document.getElementById("timer")?.style.setProperty("visibility", "visible");
        startRound();
    }

    function startRound(): void {
        rand.current = Math.floor(Math.random() * (buttons[Math.min(round.current, 5)]));
        let color = 12 * Math.floor(Math.random() * 31);
        let maxRange = Math.max(240 / (round.current + 1), 30);
        let minRange = Math.max(60 - round.current * 5, 20);
        let diff = Math.floor(Math.random() * (maxRange - minRange)) + minRange;
        let color2 = 0;
        if (color - diff < 0)
            color2 = Math.min(360, color + diff);
        else if (color + diff > 360)
            color2 = color - diff;
        else {
            if (Math.random() < 0.5)
                color2 = color - diff;
            else
                color2 = color + diff;
        }
        for (let i = 0; i < buttons[Math.min(round.current, 5)]; i++) {
            if (i != rand.current) {
                document.getElementById(`button-${i}`)?.style.setProperty("background-color", `hsl(${color}, 100%, 50%)`)
            }
            else {
                document.getElementById(`button-${i}`)?.style.setProperty("background-color", `hsl(${color2}, 100%, 50%)`)
            }
            document.getElementById(`button-${i}`)?.style.setProperty("display", "block");
        }
        document.getElementById("gameDisplay")?.style.setProperty("visibility", "visible");
        stime.current = Date.now();
        const etime = new Date();
        etime.setSeconds(etime.getSeconds() + 5);
        restart(etime);
    }

    function checkButton(id: number): void {
        pause();
        document.getElementById("gameDisplay")?.style.setProperty("visibility", "hidden")
        if (id == rand.current) {
            console.log("here3");
            setRound(++round.current);
            playCorrect();
            score.current += (round.current * (stime.current + 5000 - Date.now()) / 50);
            setScore(score.current);
            setTimeout(() => startRound(), 1000);
        }
        else{
            endGame();
        }
    }
    function endGame(): void {
        playOver();
        document.getElementById("timer")?.style.setProperty("visibility", "hidden");
        document.getElementById("gameDisplay")?.style.setProperty("display", "none");
        document.getElementById("score")?.style.setProperty("font-size", "100px")
        updateScore(Math.round(score.current))
    }

    async function updateScore(score: number) {
        //Do API call here
        var obj = { _id: userId, GameScore: score, gameId: 1 };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('https://card.christopherjparrett.xyz/api/changeScore',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            alert(res.error);
        }
        catch (error: any) {
            alert(error);
        }
    }

    return (
        <div id="color">
            <button id="startButton" onClick={startGame} z-index="1">Start</button>
            <div id="scoreDisplay">
                <div id="timer" style={{ fontSize: '100px' }}>
                    <span>{Math.max(seconds-1,0)}</span>.<span>{formatTime(milliseconds)}</span>
                </div>
                <div id="score">
                    Score: {Math.round(dispScore)}
                </div>
                <div>
                    Round: {dispRound + 1}
                </div>
            </div>
            <div id="gameDisplay" >
                {ids.map((id, index) => (
                    <button key={id} id={`button-${index}`} onClick={() => checkButton(index)}></button>
                ))}
            </div>
        </div>
    )
}

export default ColorGame