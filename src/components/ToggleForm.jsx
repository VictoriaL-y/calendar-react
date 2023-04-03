import React, {  useState } from "react";
import CheckOutsideClick from "./CheckOutsideClick";
import TimePicker from 'react-time-picker';


const ToggleForm = ({ onSave }) => {
    const [startingTime, setStartingTime] = useState('');
    const [endingTime, setEndingTime] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const toggle = () => {
        setShow(!show);
    };
    const handleClose = () => {
        setShow(false);
    };

    const handleStartingTime = (startsTime) => {
        setStartingTime(startsTime);
    };

    const handleEndingTime = (endsTime) => {
        setEndingTime(endsTime);
    };

    const handleOnSave = () => {
        if (title && startingTime && endingTime) {
            const newEvent = {
                title,
                start: startingTime,
                end: endingTime
            }
            onSave(newEvent);
            
            
            setError(false);
            // setTitle("")
            // setStartingTime('')
            // setEndingTime('')

            toggle()
        } else {
            setError(true);
        }
    }

    return (
        <CheckOutsideClick onClickOutside={handleClose}>

            <button id="buttAddEvent" onClick={toggle}>
                <i className="fa-regular fa-square-plus"></i>
            </button>


            <div className={show ? "add-event-wrapper active" : "add-event-wrapper"}>
                <div className="add-event-header">
                    <div className="title">New Event</div>
                    <i onClick={toggle} className="fas fa-times close"></i>
                </div>
                <div className="add-event-body">
                    <div className="add-event-input">
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text"
                            placeholder="Event Name" className={`event-name ${error ? 'error' : ''}`} />
                    </div>
                    <div className="add-event-input">
                        {/* <input type="text" placeholder="Starts From" className="event-time-from" /> */}
                        < TimePicker onChange={handleStartingTime} value={startingTime}/>
                    </div>
                    <div className="add-event-input">
                        {/* <input type="text" placeholder="Ends At" className="event-time-to" /> */}
                        < TimePicker onChange={handleEndingTime} value={endingTime}/>
                        
                    </div>
                </div>

                <div className="add-event-footer">
                    <button onClick={handleOnSave} className="add-event-btn">Add Event</button>


                </div>
            </div>

        </CheckOutsideClick>
    )
}



export default ToggleForm