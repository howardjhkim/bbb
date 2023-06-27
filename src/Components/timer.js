import React, { useState, useEffect, useContext } from 'react'
import {Context} from "../Context/DataContext"
import timer from "../CSS/timer.css"

function Timer() {
    //Context Provider
    const {timer, rounds, shortBreak, longBreak, toggled} = useContext(Context)
    console.log(toggled)

    const [endSign, setEndSign] = useState(false)
    const [isCounting, setIsCounting] = useState(false)
    const [intervalId, setIntervalId] = useState(null)

    const [starting, setStarting] = useState(false)

    const [roundCounter, setRoundCounter] = useState(0)

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleButtonClick = () => {
        if(roundCounter > 0 && Number(roundCounter) === Number(rounds)) {
            return
        }
        
        if (isCounting) {
            stopCounting();
        } else {
            startCounting();
        }
    }

    useEffect(() => {
        if (isCounting) {
            if (minutes > 0 && seconds === 0) {
                setMinutes((prevMins) => prevMins - 1)
                setSeconds(59)
            }

            if (minutes <= 0 && seconds === 0) {
                setRoundCounter((prevRounds) => prevRounds + 1)
                stopCounting()
            }

            if (minutes === 0 && seconds === 0) {
                setMinutes(timer)
                setStarting(false)
            }
        }
    }, [seconds, timer, isCounting, setRoundCounter, minutes, rounds]);

    const startCounting = () => {
        if (!starting) {
            setMinutes(timer)
        }
        
        setStarting(true)

        if(rounds.length === 0) {
            return
        }
        if (!isCounting) {
            const id = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
            setIntervalId(id);
            setIsCounting(true);
        }
    };

    const stopCounting = () => {
        if (isCounting) {
        clearInterval(intervalId);
        setIntervalId(null);
        setIsCounting(false)
        }
    }
    
    return (
        <div className="timer-master" style={toggled ? { filter: 'blur(5px)' } : null}>
            <div className="title"><h2>pomodoro</h2></div>

            <div className="focus-container">ROUND: {roundCounter} / {rounds.length === 0 ? '0' : rounds}</div>
            <button className="timer" onClick={handleButtonClick}>
                <div className="time-container">
                    <div className="time">
                        {!timer.length ? `0` : `${minutes}`}
                        :
                        {seconds < 10 ? `0${seconds}` : `${seconds}`}
                    </div>
                    <div className="pause-start">{isCounting ? "PAUSE" : "START"}</div>
                </div>
            </button>
            <div className="category">
                <div>timer</div>
                <div>short break</div>
                <div>long break</div>
            </div>
        </div>
    )
}

export default Timer