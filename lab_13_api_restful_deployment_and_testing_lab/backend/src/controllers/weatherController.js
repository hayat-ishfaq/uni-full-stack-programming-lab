const { fetchWeatherByCity } = require('../services/weatherService')

async function getWeatherByCity(req, res, next) {
  try {
    const city = (req.params.city || '').trim()

    if (!city) {
      return res.status(400).json({ error: 'City name is required.' })
    }

    const weather = await fetchWeatherByCity(city)
    return res.json(weather)
  } catch (error) {
    const status = error?.response?.status

    if (status === 404) {
      return res.status(404).json({ error: 'City not found.' })
    }

    if (status === 401) {
      return res
        .status(502)
        .json({ error: 'Weather service authentication failed.' })
    }

    if (status) {
      return res
        .status(502)
        .json({ error: 'Weather service is unavailable right now.' })
    }

    return next(error)
  }
}

module.exports = { getWeatherByCity }
