import React, { Component, useEffect, useState } from "react";


function WeatherWidget() {
    let lat;
    let long;
    const [weatherData, setWeatherData] = useState([{}])


    // Get your current position
    useEffect(() => {
        const success = (position) => {
            console.log(position);
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(lat)
            console.log(long)
            fetch(
                "http://api.openweathermap.org/geo/1.0/reverse?lat="
                + lat
                + "&lon="
                + long
                + "&limit=2&appid="
                + 'e9ca98e57b68488e060c64799d86e7fc'
            ).then((response) => response.json())
                .then((data) => weather.fetchWeather(data));

            let weather = {
                apiKey: "e9ca98e57b68488e060c64799d86e7fc",


                fetchWeather: function (data) {
                    console.log(data)
                    let city = data[0].name;
                    console.log(city);
                    fetch(
                        "https://api.openweathermap.org/data/2.5/weather?q="
                        + city
                        + "&units=metric&appid="
                        + this.apiKey
                    ).then((response) => response.json())
                        .then((data) => {
                            setWeatherData(data)
                            this.displayWeather(data)
                        });
                },
                displayWeather: function (data) {
                    const { name } = data;
                    const { icon, description } = data.weather[0];
                    const { temp, humidity } = data.main;
                    const { speed } = data.wind;
                    if (name != null) {
                        console.log(" city is " + name)
                        document.querySelector(".city").innerText = "Weather in " + name;
                        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                        document.querySelector(".description").innerText = description;
                        document.querySelector(".temp").innerText = parseInt(temp) + "°C";
                        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
                        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
                        console.log(name, icon, description, humidity, speed);
                    }
                }

            }
        }
        const error = () => {
            console.log('no');
            // window.status.textContent = 'Unable to retrieve your location';
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);



    console.log("i m working")

    return (
        <div className="card">
            {(typeof weatherData.main == 'undefined') ? (
                <div className="weather">
                    <h2 className="city"></h2>
                    <div className="temp"></div>
                    <img alt="" className="icon" />
                    <div className="description"></div>
                    <div className="humidity"></div>
                    <div className="wind"></div>
                </div>
            ) : (
                <div>
                    <h2 className="city">Berlin</h2>
                    <div className="temp"></div>
                    <img alt="" className="icon" />
                    <div className="description"></div>
                    <div className="humidity"></div>
                    <div className="wind"></div>
                </div>
            )
            }
        </div>
    )
};


export default WeatherWidget;


