import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import { } from 'dotenv/config'

const app = express()

// My API_KEY and PORT are stored in the folder .env
const API_KEY = process.env.REACT_APP_API_KEY

const PORT = process.env.PORT || 8000

app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "calendar-react-victorial-y.netlify.app"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/geolocation/:latitude/:longitude", (req, res, next) => {
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;
    try {
        const fetchWeather = async () => {

            let weather = {

                fetchWeather: function (data) {
                    let city = data[0].name;

                    // get weather of the city
                    fetch(
                        "https://api.openweathermap.org/data/2.5/weather?q="
                        + city
                        + "&units=metric&appid="
                        + API_KEY
                    ).then((response) => response.json())
                        .then((data) => {
                            // get all json weather of the current city
                            res.status(200).json({ data })
                        });
                }
            }

            await fetch(
                "http://api.openweathermap.org/geo/1.0/reverse?lat="
                + latitude
                + "&lon="
                + longitude
                + "&limit=2&appid="
                + API_KEY
            ).then((response) => response.json())
                .then((data) => {
                    weather.fetchWeather(data);
                })
        }

        fetchWeather();

    } catch (error) {
        console.log("error is " + error)
    }

})

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))