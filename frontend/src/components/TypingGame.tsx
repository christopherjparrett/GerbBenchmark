import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { generate } from "random-words";
function TypingGame() {
    const {
        totalSeconds,
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false, interval: 20 });
    const [message, setMessage] = useState('');
    const [output, setOutput] = useState('');
    const [counter, setCounter] = useState(0);
    let index = 0;
    let length = 0;
    let mistakes = 0;
    let msg = '';
    let stime = 0;

    const formatTime = (time: any) => {
        return String(time).padStart(2, '0')
      }

    function startGame(e: any): void {
        e.preventDefault();
        document.getElementById("startButton")?.style.setProperty("visibility", "hidden");
        document.getElementById("scoreDisplay")?.style.setProperty("visibility", "visible");
        generateMessage();
        start();
        stime = Date.now();
    }

    function generateMessage(): void {
        let arr = generate(40);
        if (Array.isArray(arr)) {
            setMessage(arr.join(" ") + ".");
            msg = arr.join(" ") + ".";
            length = msg.length;
        }
        document.getElementById("output")?.style.setProperty("border", "1px solid white");
        window.addEventListener("keydown", (e) => { checkChar(e) })
    }

    function checkChar(e: any): void {
        if (e.key == msg.charAt(index)) {
            console.log(seconds);
            index++;
            setOutput(msg.substring(0, index));
            if (index == length){
                pause();
                let WPM = (length/5/(Date.now()-stime + 250 * mistakes)*60000).toFixed(2);
                alert("You won! WPM: " + WPM);
                //Do API call here
            }

        }
        else {
            document.getElementById('gameDisplay')?.animate({ backgroundColor: "red" }, 200);
            setCounter(++mistakes);
        }
    }
    return (

        <div>
            <button id="startButton" onClick={startGame} z-index="1">Start</button>
            <div id="scoreDisplay">
                <div style={{ fontSize: '100px' }}>
                    <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
                </div>
                <div style={{fontSize: '50px', paddingBottom: '20px' }}>
                    Mistakes: {counter}
                </div>
            </div>
            <div id="gameDisplay">
                <div id="message">{message}</div>
                <div id="output">{output}</div>
            </div>
        </div>
    )
}

export default TypingGame