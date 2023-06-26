import React, { useState } from "react"


const Context = React.createContext()

function ContextProvider({children}) {
    
    const [timer, setTimer] = useState([])
    const addTimer = (time) => {
        setTimer(time);
    }

    const [rounds, setRounds] = useState([])
    const addRounds = (round) => {
        setRounds(round);
    }

    const [shortBreak, setShortBreak] = useState([])
    const addShortBreak = (shortBreaks) => {
        setShortBreak(shortBreaks);
    }

    const [longBreak, setLongBreak] = useState([])
    const addLongBreak = (longBreaks) => {
        setLongBreak(longBreaks);
    }


    const [toggled, setToggled] = useState(false)
    const addToggled = (toggle) => {
        setToggled(toggle)
    }

    return (
        <Context.Provider value={{
            timer, addTimer,
            rounds, addRounds,
            shortBreak, addShortBreak,
            longBreak, addLongBreak,
            toggled, addToggled
        }}>

            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}