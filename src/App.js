import React, { useEffect, useState } from "react";
import WeatherWidget from "./components/weatherWidget";
import Calendar from "./components/calendar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => {
  const [windowHeight, setWindowHight] = useState(window.innerHeight * 0.01);
  const [isreload, setIsReload] = ('false');
  document.documentElement.style.setProperty('--vh', `${windowHeight}px`);
  console.log(windowHeight);

  if (!isreload) {
    // useEffect(() => {
    // setTimeout(() => {
    const handleWindowHeight = () => {
      setWindowHight(window.innerHeight * 0.01);
      document.documentElement.style.setProperty('--vh', `${windowHeight}px`);
      console.log(windowHeight + " my vh");

    }
    console.log("Reload!")
    // window.location.reload();
    setIsReload(true);
    window.addEventListener('resize', handleWindowHeight);

    return () => {
      window.removeEventListener('resize', handleWindowHeight);
    }
    // }, [])
  }
  // }, 2000)

  // setTimeout(() => {
  //   if(!isreload) {
  //     console.log("Reload!")
  //     window.location.reload();
  //     setIsReload(true);
  //   }
  //   console.log(windowHeight + " my vh 2");
  // }, 2000)

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
