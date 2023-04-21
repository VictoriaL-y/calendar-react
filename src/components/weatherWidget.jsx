import React, { useEffect } from "react";

function WeatherWidget() {

    // Get your current position
    useEffect(() => {

        const success = async (position) => {

            const { latitude: lat, longitude: long } = position.coords;

            const displayWeather = function (data) {
                const { name } = data;
                const { icon, description } = data.weather[0];
                const { temp, humidity } = data.main;
                const { speed } = data.wind;
                if (name != null) {
                    document.querySelector(".city").innerText = "Weather in " + name;
                    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                    document.querySelector(".description").innerText = description;
                    document.querySelector(".temp").innerText = parseInt(temp) + "°C";
                    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
                    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
                }
            }

            await fetch(`/.netlify/functions/api?lat=${lat}&long=${long}`)
                .then(response => response.json())
                .then(response => {
                    displayWeather(response);
                });
        }
        const error = () => {
            document.querySelector(".city").innerText = "For weather info:";
            document.querySelector(".humidity").innerHTML = `
            <div class="error-weather">
            <p>- Turn on your device location</p>
            <p>- Allow to access your location</p>
            <p>- Refresh the page</p>
            </div>`
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return (
        <div className="card">
            <div className="weather">
                <h2 className="city"></h2>
                <div className="temp"></div>
                <img alt="" className="icon" />
                <div className="description"></div>
                <div className="humidity"></div>
                <div className="wind"></div>
            </div>
        </div>
    )
};


export default WeatherWidget;


