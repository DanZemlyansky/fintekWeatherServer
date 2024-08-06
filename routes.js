const express = require('express')
const router = express.Router()
const { getWeather }  = require('./controller')

router.get('/getWeather' , getWeather);

module.exports = router;