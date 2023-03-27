import React, { Component, useEffect, useState } from "react";

// Generate a Calendar
function DisplayCalendar() {
    let activeMonth;
    let activeYear;
    let weekday = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ];
    
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
    
    let eventsArr = useState([]);
    // getEvents();

    return (
        <div id="calendar-table" class="col-lg-8 p-0"></div>
    )
}


export default DisplayCalendar;