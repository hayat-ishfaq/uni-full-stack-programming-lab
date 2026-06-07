const express = require('express')

const { getWeatherByCity } = require('../controllers/weatherController')

const router = express.Router()

router.get('/:city', getWeatherByCity)

module.exports = router
