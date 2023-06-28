import React, { useState, useContext, useEffect } from 'react'
import setting from "../Images/settings.svg"
import settingsCSS from "../CSS/settings.css"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {Context} from "../Context/DataContext"

function Settings() {
    const [age, setAge] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    
    const {addToggled} = useContext(Context)

    const [timer, setTimer] = React.useState([])
    const { addTimer } = useContext(Context)

    const [rounds, setRounds] = React.useState([])
    const { addRounds } = useContext(Context)

    const [shortBreak, setShortBreak] = React.useState([])
    const { addShortBreak } = useContext(Context)

    const [longBreak, setLongBreak] = React.useState([])
    const { addLongBreak } = useContext(Context)
    
    
    
    const handleButtonClick = () => {
        setIsOpen((prev) => !prev)    
    }

    useEffect(() => {
        addToggled(isOpen)
        
    }, [isOpen])


    const useStyles = ({
        selectStyle: {
          backgroundColor: '#EEF1FA',
          color: 'white',
 
        },
      });
    
    const submitButton = (e) => {
        e.preventDefault()
        addTimer(timer)
        addRounds(rounds)
        addShortBreak(shortBreak)
        addLongBreak(longBreak)

        setIsOpen(!isOpen)
    }
 

    return (

    <div>
        <img src={setting} className="icons button" onClick={handleButtonClick}></img>
        <div className="modal-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className="modal-infos">
                <div className="modal-top-row">
                    <span>Settings</span>
                    <span onClick={handleButtonClick} className="button">Cancel</span>
                </div>
                
                <div className="body-container">
                    <div className="select-container">
                        <div className="select-sections">
                            <span>Time</span>
                            <TextField 
                                // style={useStyles.selectStyle}
                                id="outlined-basic" 
                                label="Timer" 
                                type='number'
                                variant="outlined"
                                value={timer}
                                onChange={(e) => setTimer(e.target.value)}
                                />

                            <TextField 
                                id="outlined-basic" 
                                label="Rounds" 
                                type='number'
                                variant="outlined" 
                                value={rounds}
                                onChange={(e) => setRounds(e.target.value)}
                                />
                        </div>

                        <div>

                        <div className="select-sections">
                            <span>Breaks</span>
                            <TextField 
                                id="outlined-basic" 
                                label="Short Break"
                                type='number'
                                variant="outlined"
                                value={shortBreak}
                                onChange={(e) => setShortBreak(e.target.value)}
                                />
                            {/* <TextField 
                                id="outlined-basic" 
                                label="Long Break" 
                                type='number'
                                variant="outlined"
                                value={longBreak}
                                onChange={(e) => setLongBreak(e.target.value)}
                                /> */}
                        </div>
                        </div>
                    </div>
                    
                    <div className="submitBtn-container">
                        <Button variant="contained" className="submitBtn " onClick={submitButton}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
  )
}

export default Settings