<<<<<<< HEAD
const express = require('express');
const axios = require('axios');

const router = express.Router();

const supportedCountries = new Set([
	'ar', 'au', 'at', 'be', 'br', 'bg', 'ca', 'cn', 'co', 'cu', 'cz', 'eg', 'fr', 'de',
	'gr', 'hk', 'hu', 'in', 'id', 'ie', 'il', 'it', 'jp', 'lv', 'lt', 'my', 'mx', 'ma',
	'nl', 'nz', 'ng', 'no', 'ph', 'pl', 'pt', 'ro', 'ru', 'sa', 'rs', 'sg', 'sk', 'si',
	'za', 'kr', 'se', 'ch', 'tw', 'th', 'tr', 'ae', 'ua', 'gb', 'us', 've'
	, 'pk'
]);

const sendError = (res, statusCode, message) => {
	return res.status(statusCode).json({
		success: false,
		message,
	});
};

const formatArticles = (articles) => {
	return articles.slice(0, 5).map((article) => ({
		title: article.title,
		source: article.source?.name || 'Unknown',
		url: article.url,
		publishedAt: article.publishedAt,
	}));
};

const fetchNews = async (req, res) => {
	const country = (req.params.country || '').trim().toLowerCase();

	if (!country) {
		return sendError(res, 400, 'Missing country code');
	}

	if (!/^[a-z]{2}$/.test(country) || !supportedCountries.has(country)) {
		return sendError(res, 400, 'Invalid country code');
	}

	const apiKey = process.env.NEWS_API_KEY;

	if (!apiKey) {
		return sendError(res, 500, 'News API key is not configured');
	}

	try {
		// Fetch the latest headlines from NewsAPI and keep the payload limited to five articles.
		const response = await axios.get('https://newsapi.org/v2/top-headlines', {
			params: {
				country,
				apiKey,
				pageSize: 5,
			},
			timeout: 10000,
		});

		const data = response.data || {};

		if (data.status === 'error') {
			if (data.code === 'apiKeyInvalid') {
				return sendError(res, 401, 'Invalid API key');
			}

			return sendError(res, 502, data.message || 'News API failure');
		}

		const articles = Array.isArray(data.articles) ? data.articles : [];

		if (articles.length === 0) {
			return sendError(res, 404, 'No news results found');
		}

		return res.status(200).json(formatArticles(articles));
	} catch (error) {
		const statusCode = error.response?.status;
		const errorCode = error.response?.data?.code;
		const networkErrorCodes = new Set(['ECONNABORTED', 'ENOTFOUND', 'EAI_AGAIN', 'ECONNRESET', 'ETIMEDOUT']);

		if (statusCode === 401 || errorCode === 'apiKeyInvalid') {
			return sendError(res, 401, 'Invalid API key');
		}

		if (statusCode === 400) {
			return sendError(res, 400, 'Invalid country code');
		}

		if (networkErrorCodes.has(error.code)) {
			return sendError(res, 503, 'Network error while fetching news');
		}

		return sendError(res, 502, 'News API failure');
	}
};

// Reject calls that omit the country parameter.
router.get('/', (req, res) => {
	return sendError(res, 400, 'Missing country code');
});

// Return the top headlines for the requested country code.
router.get('/:country', fetchNews);

module.exports = router;
=======
const express = require('express');
const axios = require('axios');

const router = express.Router();

const supportedCountries = new Set([
	'ar', 'au', 'at', 'be', 'br', 'bg', 'ca', 'cn', 'co', 'cu', 'cz', 'eg', 'fr', 'de',
	'gr', 'hk', 'hu', 'in', 'id', 'ie', 'il', 'it', 'jp', 'lv', 'lt', 'my', 'mx', 'ma',
	'nl', 'nz', 'ng', 'no', 'ph', 'pl', 'pt', 'ro', 'ru', 'sa', 'rs', 'sg', 'sk', 'si',
	'za', 'kr', 'se', 'ch', 'tw', 'th', 'tr', 'ae', 'ua', 'gb', 'us', 've'
	, 'pk'
]);

const sendError = (res, statusCode, message) => {
	return res.status(statusCode).json({
		success: false,
		message,
	});
};

const formatArticles = (articles) => {
	return articles.slice(0, 5).map((article) => ({
		title: article.title,
		source: article.source?.name || 'Unknown',
		url: article.url,
		publishedAt: article.publishedAt,
	}));
};

const fetchNews = async (req, res) => {
	const country = (req.params.country || '').trim().toLowerCase();

	if (!country) {
		return sendError(res, 400, 'Missing country code');
	}

	if (!/^[a-z]{2}$/.test(country) || !supportedCountries.has(country)) {
		return sendError(res, 400, 'Invalid country code');
	}

	const apiKey = process.env.NEWS_API_KEY;

	if (!apiKey) {
		return sendError(res, 500, 'News API key is not configured');
	}

	try {
		// Fetch the latest headlines from NewsAPI and keep the payload limited to five articles.
		const response = await axios.get('https://newsapi.org/v2/top-headlines', {
			params: {
				country,
				apiKey,
				pageSize: 5,
			},
			timeout: 10000,
		});

		const data = response.data || {};

		if (data.status === 'error') {
			if (data.code === 'apiKeyInvalid') {
				return sendError(res, 401, 'Invalid API key');
			}

			return sendError(res, 502, data.message || 'News API failure');
		}

		const articles = Array.isArray(data.articles) ? data.articles : [];

		if (articles.length === 0) {
			return sendError(res, 404, 'No news results found');
		}

		return res.status(200).json(formatArticles(articles));
	} catch (error) {
		const statusCode = error.response?.status;
		const errorCode = error.response?.data?.code;
		const networkErrorCodes = new Set(['ECONNABORTED', 'ENOTFOUND', 'EAI_AGAIN', 'ECONNRESET', 'ETIMEDOUT']);

		if (statusCode === 401 || errorCode === 'apiKeyInvalid') {
			return sendError(res, 401, 'Invalid API key');
		}

		if (statusCode === 400) {
			return sendError(res, 400, 'Invalid country code');
		}

		if (networkErrorCodes.has(error.code)) {
			return sendError(res, 503, 'Network error while fetching news');
		}

		return sendError(res, 502, 'News API failure');
	}
};

// Reject calls that omit the country parameter.
router.get('/', (req, res) => {
	return sendError(res, 400, 'Missing country code');
});

// Return the top headlines for the requested country code.
router.get('/:country', fetchNews);

module.exports = router;
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
