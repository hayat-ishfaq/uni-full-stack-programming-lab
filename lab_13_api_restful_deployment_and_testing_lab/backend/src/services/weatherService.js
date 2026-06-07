const axios = require('axios')

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

async function fetchWeatherByCity(city) {
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    const error = new Error('OPENWEATHER_API_KEY is missing.')
    error.statusCode = 500
    throw error
  }

  const response = await axios.get(WEATHER_BASE_URL, {
    params: {
      q: city,
      appid: apiKey,
      units: 'metric',
    },
  })

  const data = response.data

  return {
    city: data.name,
    temperature: data.main?.temp,
    condition: data.weather?.[0]?.description,
    humidity: data.main?.humidity,
  }
}

module.exports = { fetchWeatherByCity }
