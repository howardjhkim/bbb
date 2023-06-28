import React, { useState, useEffect, useContext } from 'react'
import {Context} from "../Context/DataContext"
import timer from "../CSS/timer.css"

function Timer() {
    //Context Provider
    const {timer, rounds, shortBreak, longBreak, toggled} = useContext(Context)

    const [isCounting, setIsCounting] = useState(false)
    const [intervalId, setIntervalId] = useState(null)


    const [roundCounter, setRoundCounter] = useState(0)

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    //Break timer useStates

    

    
    
    const [counter, setCounter] = useState(0)
    const [roundComplete, setRoundComplete] = useState(false)
    const [breakTime, setBreakTime] = useState(false)
    





    console.log('breakTime: ' + breakTime)
    console.log('isCounting: ' + isCounting)




    useEffect(() => {


        if (isCounting) {
            if (!breakTime) {
                if (minutes > 0 && seconds === 0) {
                    setMinutes((prevMins) => prevMins - 1)
                    setSeconds(59)
                }
    
                //when it reaches last second of the round | used so setMinutes does not rerender
                if (counter > 0) {
                    if (minutes === 0 && seconds === 0) {
                        setRoundComplete(true)
                        setBreakTime(true)
                        setMinutes(shortBreak)
                        setRoundCounter((prevRound) => prevRound + 1)
                        stopFunc()            
                    }
                }
            }


            if (breakTime) {
                if (minutes > 0 && seconds === 0) {
                    setMinutes((prevMins) => prevMins - 1)
                    setSeconds(59)
                }
    
                //when it reaches last second of the round | used so setMinutes does not rerender
                
                if (minutes === 0 && seconds === 0) {
                    setRoundComplete(false)
                    setBreakTime(false)
                    setMinutes(timer)
                    stopFunc()            
                }
            }
        
            ////////////////////////////////////////////////////


        
            


        }
    }, [seconds, timer, isCounting, setRoundCounter, minutes, rounds]);

    const handleButtonClick = () => {
        // if any of the settings are missing, return/do not run
        if (!timer || !rounds || !shortBreak || !longBreak) {return} 

        if(Number(roundCounter) === Number(rounds)) {return}

   
        if(!isCounting) {
            startFunc()
        } else {
            stopFunc()
        }
        
       


    }
    // regular timer function
    const regTimerFunc = () => {
        if (counter === 0) {
            setMinutes(timer)
        }
        setCounter((prev) => prev + 1)
        const id = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        
        setIntervalId(id);
    }

    // break timer function
    const breakTimerFunc = () => {
        
        
        setCounter((prev) => prev + 1)
        const id = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        
        setIntervalId(id);


       
    }
        
    // general start counter function
    const startFunc = () => {
        setIsCounting(true)

        // if timer is inputted and round is ready to go at round: 0/1, run the regular timer (regTimerFunc)
        if (!breakTime) {
            regTimerFunc();
        }


        if (breakTime) {
            breakTimerFunc()
        }
    }
    // general stop counter function
    const stopFunc = () => {
        setIsCounting(false)
        clearInterval(intervalId)
    }


    return (
        <div className="timer-master" style={toggled ? { filter: 'blur(5px)' } : null}>
            <div className="title"><h1>domoporo</h1></div>

            <div className="focus-container">Round: {roundCounter} / {rounds.length === 0 ? '0' : rounds}</div>
            <button className="timer" onClick={handleButtonClick} style={roundComplete ? {display:'none'} : {}}>
                <div className="time-container">
                    <div className="time">
                        {!timer.length ? `0` : `${minutes}`}
                        :
                        {seconds < 10 ? `0${seconds}` : `${seconds}`}
                    </div>
                    <div className="pause-start">{isCounting ? "PAUSE" : "START"}</div>
                </div>
            </button>


            <button className="break-timer" onClick={handleButtonClick} style={!roundComplete ? {display:'none'} : {}}>
                <div className="time-container">
                    <div className="time">
                        {!shortBreak.length ? `0` : `${minutes}`}
                        :
                        {seconds < 10 ? `0${seconds}` : `${seconds}`}
                    </div>
                    <div className="pause-start">{isCounting ? "PAUSE" : "START"}</div>
                </div>
            </button>


            <div className="category">
                <div style={{backgroundColor: !breakTime ? `#E3686E` : ""}}>Timer</div>
                <div style={{backgroundColor: breakTime ? `#E3686E` : ""}}>Short Break</div>
            </div>
        </div>
    )
}

export default Timer