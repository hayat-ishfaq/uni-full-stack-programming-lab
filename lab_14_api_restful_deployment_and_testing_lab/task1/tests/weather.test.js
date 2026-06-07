<<<<<<< HEAD
const request = require('supertest');
const axios = require('axios');

jest.mock('axios');

const app = require('../app');

describe('Weather Forecast API', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		process.env.WEATHER_API_KEY = 'test-api-key';
	});

	it('returns the weather payload for a valid city', async () => {
		axios.get.mockResolvedValue({
			data: {
				name: 'London',
				main: {
					temp: 22,
					humidity: 70,
				},
				weather: [{ main: 'Clouds' }],
			},
		});

		const response = await request(app).get('/api/weather/London');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			city: 'London',
			temperature: 22,
			condition: 'Clouds',
			humidity: 70,
		});
	});

	it('returns 400 when city parameter is missing', async () => {
		const response = await request(app).get('/api/weather');

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ error: 'City parameter is required.' });
	});

	it('returns 404 when the city is invalid', async () => {
		axios.get.mockRejectedValue({
			response: {
				status: 404,
			},
		});

		const response = await request(app).get('/api/weather/NowhereCity');

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: 'City not found.' });
	});

	it('returns 401 when the API key is invalid', async () => {
		axios.get.mockRejectedValue({
			response: {
				status: 401,
			},
		});

		const response = await request(app).get('/api/weather/London');

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ error: 'Invalid API key.' });
	});

	it('returns 500 when the weather API fails unexpectedly', async () => {
		axios.get.mockRejectedValue(new Error('Network failure'));

		const response = await request(app).get('/api/weather/London');

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: 'Failed to fetch weather data.' });
	});
=======
const request = require('supertest');
const axios = require('axios');

jest.mock('axios');

const app = require('../app');

describe('Weather Forecast API', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		process.env.WEATHER_API_KEY = 'test-api-key';
	});

	it('returns the weather payload for a valid city', async () => {
		axios.get.mockResolvedValue({
			data: {
				name: 'London',
				main: {
					temp: 22,
					humidity: 70,
				},
				weather: [{ main: 'Clouds' }],
			},
		});

		const response = await request(app).get('/api/weather/London');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			city: 'London',
			temperature: 22,
			condition: 'Clouds',
			humidity: 70,
		});
	});

	it('returns 400 when city parameter is missing', async () => {
		const response = await request(app).get('/api/weather');

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ error: 'City parameter is required.' });
	});

	it('returns 404 when the city is invalid', async () => {
		axios.get.mockRejectedValue({
			response: {
				status: 404,
			},
		});

		const response = await request(app).get('/api/weather/NowhereCity');

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: 'City not found.' });
	});

	it('returns 401 when the API key is invalid', async () => {
		axios.get.mockRejectedValue({
			response: {
				status: 401,
			},
		});

		const response = await request(app).get('/api/weather/London');

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ error: 'Invalid API key.' });
	});

	it('returns 500 when the weather API fails unexpectedly', async () => {
		axios.get.mockRejectedValue(new Error('Network failure'));

		const response = await request(app).get('/api/weather/London');

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: 'Failed to fetch weather data.' });
	});
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
});