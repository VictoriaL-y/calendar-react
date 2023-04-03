import React, {  useState } from "react";
import CheckOutsideClick from "./CheckOutsideClick";

const ToggleForm = ({ onSave }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const toggle = () => {
        setShow(!show);
    };
    const handleClose = () => {
        setShow(false);
    };


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
                        <input type="text" placeholder="Starts From" className="event-time-from" />
                    </div>
                    <div className="add-event-input">
                        <input type="text" placeholder="Ends At" className="event-time-to" />
                    </div>
                </div>

                <div className="add-event-footer">
                    <button onClick={() => {
                        if (title) {
                            setError(false);
                            onSave(title);
                            setTitle("")
                            toggle()
                        } else {
                            setError(true);
                        }
                    }} className="add-event-btn">Add Event</button>


                </div>
            </div>

        </CheckOutsideClick>
    )
}



export default ToggleForm