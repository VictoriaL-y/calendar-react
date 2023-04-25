import React from "react";
import WeatherWidget from "./components/weatherWidget";
import Calendar from "./components/calendar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => {

  //First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  console.log(vh);
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  console.log("my height is " + vh);

  return (
    <>

      <WeatherWidget />

      <div className="row calendar container-fluid px-0 m-0">
        <div className="col-sm-1 col-lg-2"></div>
        <div id="calendar" className="col-xs-12 col-sm-10 col-lg-8 container-fluid p-0">
          <div id="month-year"></div>

          <Calendar />

        </div>
        <div className="col-sm-1 col-lg-2"></div>
      </div>

    </>
  );
}

export default App;
