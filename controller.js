const axios = require("axios");


// require('dotenv').config();
//!usually this is how i would do it
// const API_KEY = process.env.API_KEY;
// const API_BASE_URL = process.env.API_BASE_URL;

API_KEY = '3485b849ad8841fc9ba120916240508' 
API_BASE_URL = 'http://api.weatherapi.com/v1'


const getWeather = async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).send({ error: 'City query required' });
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: city,

            }
        });
        res.send(response.data);
    } catch (error) {
        console.error('Error getting weather data:', error);
        res.status(500).send({ error: 'Error getting weather data' });
    }
};



const getForecast = async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).send({ error: 'City query required' });
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/forecast.json`, {
            params: {
                key: API_KEY,
                q: city,
                days: 2,  
            }
        });

        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();
        const forecastData = [];

        const todayForecast = response.data.forecast.forecastday[0].hour;

        const remainingHoursToday = todayForecast.filter(hourData => {
            const hour = new Date(hourData.time).getHours();
            return hour >= currentHour;
        });

        forecastData.push(...remainingHoursToday);

        if (forecastData.length < 5) {
            const nextDayForecast = response.data.forecast.forecastday[1].hour;
            const neededHours = 5 - forecastData.length;
            forecastData.push(...nextDayForecast.slice(0, neededHours));
        }

        const finalForecastData = forecastData.slice(0, 5);

        res.send({
            location: response.data.location,
            current: response.data.current,
            forecast: finalForecastData
        });

    } catch (error) {
        console.error('Error getting weather data:', error);
        res.status(500).send({ error: 'Error getting weather data' });
    }
};


module.exports = { getWeather , getForecast };
