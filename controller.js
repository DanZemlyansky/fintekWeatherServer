const axios = require("axios");
require('dotenv').config();

const API_KEY = process.env.API_KEY; 
const API_BASE_URL = process.env.API_BASE_URL;

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

module.exports = { getWeather };
