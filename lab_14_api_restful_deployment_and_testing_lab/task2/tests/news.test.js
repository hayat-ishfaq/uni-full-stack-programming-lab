<<<<<<< HEAD
const request = require('supertest');
const axios = require('axios');

jest.mock('axios');

const app = require('../app');

describe('News API', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		process.env.NEWS_API_KEY = 'test-news-api-key';
	});

	it('returns the first five formatted articles for a valid country', async () => {
		axios.get.mockResolvedValue({
			data: {
				status: 'ok',
				articles: [
					{
						title: 'Title 1',
						source: { name: 'BBC News' },
						url: 'https://example.com/1',
						publishedAt: '2026-06-01T10:00:00Z',
					},
					{
						title: 'Title 2',
						source: { name: 'CNN' },
						url: 'https://example.com/2',
						publishedAt: '2026-06-01T11:00:00Z',
					},
					{
						title: 'Title 3',
						source: { name: 'Reuters' },
						url: 'https://example.com/3',
						publishedAt: '2026-06-01T12:00:00Z',
					},
					{
						title: 'Title 4',
						source: { name: 'AP News' },
						url: 'https://example.com/4',
						publishedAt: '2026-06-01T13:00:00Z',
					},
					{
						title: 'Title 5',
						source: { name: 'Al Jazeera' },
						url: 'https://example.com/5',
						publishedAt: '2026-06-01T14:00:00Z',
					},
					{
						title: 'Title 6',
						source: { name: 'Extra' },
						url: 'https://example.com/6',
						publishedAt: '2026-06-01T15:00:00Z',
					},
				],
			},
		});

		const response = await request(app).get('/api/news/us');

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body).toHaveLength(5);
		expect(response.body[0]).toEqual({
			title: 'Title 1',
			source: 'BBC News',
			url: 'https://example.com/1',
			publishedAt: '2026-06-01T10:00:00Z',
		});
		expect(response.body[4]).toEqual({
			title: 'Title 5',
			source: 'Al Jazeera',
			url: 'https://example.com/5',
			publishedAt: '2026-06-01T14:00:00Z',
		});
	});

	it('returns 400 for a missing country code', async () => {
		const response = await request(app).get('/api/news');

		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			success: false,
			message: 'Missing country code',
		});
	});

	it('returns 400 for an invalid country code', async () => {
		const response = await request(app).get('/api/news/usa');

		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			success: false,
			message: 'Invalid country code',
		});
	});

	it('returns 401 when the API key is invalid', async () => {
		axios.get.mockRejectedValue({
			response: {
				status: 401,
				data: {
					code: 'apiKeyInvalid',
				},
			},
		});

		const response = await request(app).get('/api/news/us');

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			success: false,
			message: 'Invalid API key',
		});
	});

	it('returns 404 when news results are empty', async () => {
		axios.get.mockResolvedValue({
			data: {
				status: 'ok',
				articles: [],
			},
		});

		const response = await request(app).get('/api/news/gb');

		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			success: false,
			message: 'No news results found',
		});
	});

	it('returns 503 when a network error occurs', async () => {
		axios.get.mockRejectedValue({
			code: 'ENOTFOUND',
		});

		const response = await request(app).get('/api/news/pk');

		expect(response.status).toBe(503);
		expect(response.body).toEqual({
			success: false,
			message: 'Network error while fetching news',
		});
	});

	it('returns 502 when NewsAPI fails unexpectedly', async () => {
		axios.get.mockRejectedValue(new Error('Unexpected failure'));

		const response = await request(app).get('/api/news/ca');

		expect(response.status).toBe(502);
		expect(response.body).toEqual({
			success: false,
			message: 'News API failure',
		});
	});
=======
const request = require('supertest');
const axios = require('axios');

jest.mock('axios');

const app = require('../app');

describe('News API', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		process.env.NEWS_API_KEY = 'test-news-api-key';
	});

	it('returns the first five formatted articles for a valid country', async () => {
		axios.get.mockResolvedValue({
			data: {
				status: 'ok',
				articles: [
					{
						title: 'Title 1',
						source: { name: 'BBC News' },
						url: 'https://example.com/1',
						publishedAt: '2026-06-01T10:00:00Z',
					},
					{
						title: 'Title 2',
						source: { name: 'CNN' },
						url: 'https://example.com/2',
						publishedAt: '2026-06-01T11:00:00Z',
					},
					{
						title: 'Title 3',
						source: { name: 'Reuters' },
						url: 'https://example.com/3',
						publishedAt: '2026-06-01T12:00:00Z',
					},
					{
						title: 'Title 4',
						source: { name: 'AP News' },
						url: 'https://example.com/4',
						publishedAt: '2026-06-01T13:00:00Z',
					},
					{
						title: 'Title 5',
						source: { name: 'Al Jazeera' },
						url: 'https://example.com/5',
						publishedAt: '2026-06-01T14:00:00Z',
					},
					{
						title: 'Title 6',
						source: { name: 'Extra' },
						url: 'https://example.com/6',
						publishedAt: '2026-06-01T15:00:00Z',
					},
				],
			},
		});

		const response = await request(app).get('/api/news/us');

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body).toHaveLength(5);
		expect(response.body[0]).toEqual({
			title: 'Title 1',
			source: 'BBC News',
			url: 'https://example.com/1',
			publishedAt: '2026-06-01T10:00:00Z',
		});
		expect(response.body[4]).toEqual({
			title: 'Title 5',
			source: 'Al Jazeera',
			url: 'https://example.com/5',
			publishedAt: '2026-06-01T14:00:00Z',
		});
	});

	it('returns 400 for a missing country code', async () => {
		const response = await request(app).get('/api/news');

		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			success: false,
			message: 'Missing country code',
		});
	});

	it('returns 400 for an invalid country code', async () => {
		const response = await request(app).get('/api/news/usa');

		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			success: false,
			message: 'Invalid country code',
		});
	});

	it('returns 401 when the API key is invalid', async () => {
		axios.get.mockRejectedValue({
			response: {
				status: 401,
				data: {
					code: 'apiKeyInvalid',
				},
			},
		});

		const response = await request(app).get('/api/news/us');

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			success: false,
			message: 'Invalid API key',
		});
	});

	it('returns 404 when news results are empty', async () => {
		axios.get.mockResolvedValue({
			data: {
				status: 'ok',
				articles: [],
			},
		});

		const response = await request(app).get('/api/news/gb');

		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			success: false,
			message: 'No news results found',
		});
	});

	it('returns 503 when a network error occurs', async () => {
		axios.get.mockRejectedValue({
			code: 'ENOTFOUND',
		});

		const response = await request(app).get('/api/news/pk');

		expect(response.status).toBe(503);
		expect(response.body).toEqual({
			success: false,
			message: 'Network error while fetching news',
		});
	});

	it('returns 502 when NewsAPI fails unexpectedly', async () => {
		axios.get.mockRejectedValue(new Error('Unexpected failure'));

		const response = await request(app).get('/api/news/ca');

		expect(response.status).toBe(502);
		expect(response.body).toEqual({
			success: false,
			message: 'News API failure',
		});
	});
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
});