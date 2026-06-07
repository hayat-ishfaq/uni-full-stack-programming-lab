<<<<<<< HEAD
const express = require('express');
const axios = require('axios');

const router = express.Router();

const getWeatherErrorResponse = (statusCode, message) => ({
	statusCode,
	body: {
		error: message,
	},
});

const fetchWeather = async (req, res) => {
	const city = (req.params.city || '').trim();

	if (!city) {
		const errorResponse = getWeatherErrorResponse(400, 'City parameter is required.');
		return res.status(errorResponse.statusCode).json(errorResponse.body);
	}

	const apiKey = process.env.WEATHER_API_KEY;

	if (!apiKey) {
		const errorResponse = getWeatherErrorResponse(500, 'Weather API key is not configured.');
		return res.status(errorResponse.statusCode).json(errorResponse.body);
	}

	try {
		// Call OpenWeatherMap asynchronously and map the response into the API contract.
		const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
			params: {
				q: city,
				appid: apiKey,
				units: 'metric',
			},
		});

		const weather = response.data;

		return res.status(200).json({
			city: weather.name,
			temperature: Math.round(weather.main.temperature ?? weather.main.temp),
			condition: weather.weather?.[0]?.main || 'Unknown',
			humidity: weather.main.humidity,
		});
	} catch (error) {
		const statusCode = error.response?.status;

		if (statusCode === 404) {
			return res.status(404).json({ error: 'City not found.' });
		}

		if (statusCode === 401) {
			return res.status(401).json({ error: 'Invalid API key.' });
		}

		return res.status(500).json({ error: 'Failed to fetch weather data.' });
	}
};

// Handle missing city parameter explicitly when the route is called without a city name.
router.get('/', (req, res) => {
	return res.status(400).json({ error: 'City parameter is required.' });
});

// Fetch live weather data for the requested city.
router.get('/:city', fetchWeather);

module.exports = router;
=======
const express = require('express');
const axios = require('axios');

const router = express.Router();

const getWeatherErrorResponse = (statusCode, message) => ({
	statusCode,
	body: {
		error: message,
	},
});

const fetchWeather = async (req, res) => {
	const city = (req.params.city || '').trim();

	if (!city) {
		const errorResponse = getWeatherErrorResponse(400, 'City parameter is required.');
		return res.status(errorResponse.statusCode).json(errorResponse.body);
	}

	const apiKey = process.env.WEATHER_API_KEY;

	if (!apiKey) {
		const errorResponse = getWeatherErrorResponse(500, 'Weather API key is not configured.');
		return res.status(errorResponse.statusCode).json(errorResponse.body);
	}

	try {
		// Call OpenWeatherMap asynchronously and map the response into the API contract.
		const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
			params: {
				q: city,
				appid: apiKey,
				units: 'metric',
			},
		});

		const weather = response.data;

		return res.status(200).json({
			city: weather.name,
			temperature: Math.round(weather.main.temperature ?? weather.main.temp),
			condition: weather.weather?.[0]?.main || 'Unknown',
			humidity: weather.main.humidity,
		});
	} catch (error) {
		const statusCode = error.response?.status;

		if (statusCode === 404) {
			return res.status(404).json({ error: 'City not found.' });
		}

		if (statusCode === 401) {
			return res.status(401).json({ error: 'Invalid API key.' });
		}

		return res.status(500).json({ error: 'Failed to fetch weather data.' });
	}
};

// Handle missing city parameter explicitly when the route is called without a city name.
router.get('/', (req, res) => {
	return res.status(400).json({ error: 'City parameter is required.' });
});

// Fetch live weather data for the requested city.
router.get('/:city', fetchWeather);

module.exports = router;
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
