const express = require('express')
const router = express.Router()
const { getWeather, getForecast }  = require('./controller')

router.get('/getWeather' , getWeather);
router.get('/getForecast' , getForecast)


module.exports = router;