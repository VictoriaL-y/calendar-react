import React, { useEffect} from "react";


const apiKey=process.env.REACT_APP_API_KEY;

function WeatherWidget() {
    let lat;
    let long;

    // Get your current position
    useEffect(() => {
        const success = (position) => {

            lat = position.coords.latitude;
            long = position.coords.longitude;

            // get the name of the city
            fetch(
                "http://api.openweathermap.org/geo/1.0/reverse?lat="
                + lat
                + "&lon="
                + long
                + "&limit=2&appid="
                + apiKey
            ).then((response) => response.json())
                .then((data) => weather.fetchWeather(data));

            let weather = {
                apiKey: apiKey,

                fetchWeather: function (data) {
                    console.log(data)
                    let city = data[0].name;

                    // get weather of the city
                    fetch(
                        "https://api.openweathermap.org/data/2.5/weather?q="
                        + city
                        + "&units=metric&appid="
                        + this.apiKey
                    ).then((response) => response.json())
                        .then((data) => {
                            this.displayWeather(data)
                        });
                },

                displayWeather: function (data) {
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
            }
        }
        const error = () => {
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


