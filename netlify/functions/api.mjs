// import fetch from 'node-fetch'
import { } from 'dotenv/config'
import fetch from 'node-fetch';

export const handler = async (event) => {

    const { lat, long } = event.queryStringParameters || {}

    try {

        const API_KEY = process.env.REACT_APP_API_KEY

        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=2&appid=${API_KEY}`)

        if (!response.ok) {
            // NOT res.status >= 200 && res.status < 300
            return { statusCode: response.status, body: response.statusText }
        }

        const data = await response.json()

        const city = data[0].name

        const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)

        const data2 = await response2.json()

        if (!response2.ok) {
            // NOT res.status >= 200 && res.status < 300
            return { statusCode: response2.status, body: response2.statusText }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data2)
        }

    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}