import React, { Component } from "react";
import WeatherWidget from "./components/weatherWidget";
import DisplayCalendar from "./components/calendar";
import './index.css';

class App extends Component {
  render() {
    return (
      <div>

        <WeatherWidget />

        <div class="row calendar container-fluid px-0 m-0">
          <div class="col-md-1 col-lg-2"></div>
          <div id="calendar" class="col-md-10 col-lg-8 container-fluid p-0">
            <div id="month-year"></div>
            <div class="row">
              <DisplayCalendar />
            </div>
          </div>
        </div>
        <div class="col-md-1 col-lg-2"></div>
      </div>
    );
  }
}

export default App;
