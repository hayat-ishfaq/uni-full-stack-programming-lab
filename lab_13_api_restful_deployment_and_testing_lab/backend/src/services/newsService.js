const axios = require('axios')

const NEWS_BASE_URL = 'https://newsapi.org/v2/top-headlines'

async function fetchNewsByCountry(country, limit) {
  const apiKey = process.env.NEWS_API_KEY

  if (!apiKey) {
    const error = new Error('NEWS_API_KEY is missing.')
    error.statusCode = 500
    throw error
  }

  const response = await axios.get(NEWS_BASE_URL, {
    params: {
      country,
      apiKey,
      pageSize: limit,
    },
  })

  const articles = Array.isArray(response.data?.articles)
    ? response.data.articles
    : []

  return {
    country,
    count: Math.min(limit, articles.length),
    articles: articles.slice(0, limit).map((article) => ({
      title: article.title,
      source: article.source?.name,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
    })),
  }
}

module.exports = { fetchNewsByCountry }
