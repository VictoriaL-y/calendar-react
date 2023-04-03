import React, { useEffect, useRef, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import ToggleForm from "./ToggleForm";
import DeleteEvent from "./DeleteEvent";
import CheckOutsideClick from "./CheckOutsideClick";

const Calendar = () => {
    let monthsOfYear = [
        'January',
        'February',
        'March',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    let weekdays = [

        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    let weekdaysShort = [

        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ];

    let currentDate = new Date().toLocaleString().split(",")[0];
    let currentMonthAndYear = monthsOfYear[new Date().getMonth()] + " " + new Date().getFullYear();
    let currentWeekdayNum = new Date().getDay()
    if (currentWeekdayNum == 0) {
        currentWeekdayNum = 6
    } else {
        currentWeekdayNum--;
    }

    let currentWeekday = weekdaysShort[currentWeekdayNum]

    const [nav, setNav] = useState(0);
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState('');
    const [clicked, setClicked] = useState(currentDate);
    const [events, setEvents] = useState();
    const [isActive, setActive] = React.useState(-1);

    const toggleClass = index => setActive(index)
    const [activeDay, setActiveDay] = useState();
    const [activeMonthAndYear, setActiveMonthAndYear] = useState();
    const [activeWeekday, setActiveWeekday] = useState();
    const [show, setShow] = useState(false);
    const handleClickOpen = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };
    // const handleShow = () => setShow(!show);

    const [eventKey, setEventKey] = useState();

    const handleEvetsChange = (eventInfos) => {
        // console.log(eventInfos.title + " is event infos, " + eventInfos.start + " start and " + eventInfos.end + " is end")
        const newEvent = {
            date: clicked,
            title: eventInfos.title,
            start: eventInfos.start,
            end: eventInfos.end
        }



        setEvents([...events, newEvent]);
    };
    console.log(events)

        const eventForDate = date => {
            if(Array.isArray(events)) {
            events.find(e => e.date === date)
            };
        };
    // console.log(eventForDate + " is eventFor Date")

    useEffect(() => {
        const myevents = localStorage.getItem('events');

        if (myevents) {
            if (Array.isArray(myevents)) {
                setEvents(JSON.parse(myevents));
                console.log(myevents + " say hi");
            }
        }
    },);


    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);
    console.log(events + " is my events")

    useEffect(() => {
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);

        }

        const day = dt.getDate();
        // console.log(day + " is a day")
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        // console.log(firstDayOfMonth + " is a first day of month")
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        // console.log("days in month are " + daysInMonth)
        const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: "long",
            year: "numeric",
            month: 'numeric',
            day: "numeric",
        });
        // console.log(dateString)

        setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);

        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

        const daysArr = [];

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const dayString = `${month + 1}/${i - paddingDays}/${year}`;
            // console.log(dayString)

            if (i > paddingDays) {
                daysArr.push({
                    value: i - paddingDays,
                    event: eventForDate(dayString),
                    isCurrentDay: i - paddingDays === day && nav === 0,
                    date: dayString,
                });
            } else {
                daysArr.push({
                    value: 'padding',
                    event: null,
                    isCurrentDay: false,
                    date: '',
                });
            }
        }

        setDays(daysArr);
    }, [events, nav]);


    // console.log(dateDisplay)
    // console.log(clicked)
    // console.log(activeDay)

    return (
        <>
            <div className="row">
                <div id="calendar-table" className="col-lg-8 p-0">

                    <CalendarHeader
                        dateDisplay={dateDisplay}
                        onBack={() =>
                            setNav(nav - 1)}
                        onNext={() => setNav(nav + 1)}
                    />
                    <div id="weekdays">
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                        <div>Sun</div>
                    </div>

                    <div id="calendarBody">
                        {days.map((d, index) => (
                            (activeMonthAndYear == undefined && d.isCurrentDay ? (
                                <div
                                    key={index}
                                    day={d}
                                    className={`day today active ${(d.date == currentDate && d.event) ? "event" : ''}`}>
                                    {d.value === 'padding' ? '' : d.value}
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    day={d}
                                    className={`day ${d.value === 'padding' ? 'padding' : ''} ${d.isCurrentDay ? 'today' : ''} 
                            ${d.event ? 'event' : ''}
                        ${(isActive == index &&
                                            (activeMonthAndYear == dateDisplay)) &&
                                        'active'}`}



                                    onClick={() => {
                                        if (d.value !== 'padding') {
                                            toggleClass(index);
                                            setClicked(d.date);
                                            setActiveDay(d.value);
                                            setActiveMonthAndYear(dateDisplay)

                                            let choosedDate = new Date(d.date);
                                            let weekdayNum = choosedDate.getDay()
                                            if (weekdayNum == 0) {
                                                weekdayNum = 6
                                            } else {
                                                weekdayNum--;
                                            }

                                            setActiveWeekday(weekdaysShort[weekdayNum])

                                        }
                                    }}
                                >
                                    {d.value == 'padding' ? '' : d.value}
                                </div>
                            ))
                        ))}
                    </div>
                </div>

                <div className="col-lg-4 notes">
                    <div className="today-date">
                        <div className="event-day">
                            {(activeDay == undefined && activeMonthAndYear == undefined) ? currentWeekday : activeWeekday}

                        </div>
                        <div className="event-date">
                            {activeDay != undefined ? (activeDay + " " + activeMonthAndYear) : ''}
                            {(activeDay == undefined && activeMonthAndYear == undefined) ? currentMonthAndYear : ""}
                        </div>
                    </div>



                    <div className="events">
                        {Array.isArray(events) && events.map((event, index) => (

                            ((event.date === clicked && clicked !== currentDate) ||
                                (event.date == currentDate && clicked === currentDate)) ? (
                                <div
                                    key={index}
                                    event={event}
                                    className="event"
                                    onClick={() => {
                                        handleClickOpen(); setEventKey(index)
                                    }}
                                >
                                    {console.log(event.date + " event date and clicked: " + clicked)}

                                    <div className="title">
                                        <i
                                            className="fas fa-circle"></i>
                                        <h3 className="event-title">{event.title}</h3>
                                        {/* {console.log(event.title + " is title")} */}
                                        {/* {console.log(eventForDate(clicked).title + "from delete")}  */}
                                    </div>
                                    <div className="event-time">
                                        {/* <span className="event-time">Result </span> */}
                                        <span className="event-time">{event.start} - {event.end}</span>
                                        {/* {console.log(event.start + " is start and " + event.end)} */}
                                    </div>
                                </div>) : "")
                        )}

                        {Array.isArray(events) && !(events.find(e => e.date === clicked)) ? (
                            <div className="no-event">
                                <h3>No Events</h3>
                            </div>
                        ) : ''}
                    </div>

                    {/* {console.log(clicked + " is clicked and")}
                    {console.log(events.filter(e => e.date !== clicked + " is clicked and"))} */}

                    <ToggleForm
                        onSave={
                            handleEvetsChange

                            // setEvents([...events, { title, date: clicked }]);
                        } />

                </div>
            </div>


            <CheckOutsideClick onClickOutside={handleClose}>
                {show === true &&
                    < DeleteEvent
                        show={show}
                        // eventText={eventForDate(clicked).title}
                        onDelete={() => {
                            setEvents(events.filter((e, index) => index !== eventKey));
                            handleClose();
                        }}
                        onClose={handleClose}


                    />
                }
            </CheckOutsideClick>

        </>
    )
}

export default Calendar;