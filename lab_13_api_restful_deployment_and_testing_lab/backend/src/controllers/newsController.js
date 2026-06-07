const { fetchNewsByCountry } = require('../services/newsService')
const { normalizeCountryCode } = require('../utils/validators')

async function getNewsByCountry(req, res, next) {
  try {
    const country = normalizeCountryCode(req.params.country)

    if (!country) {
      return res
        .status(400)
        .json({ error: 'Country code must be a 2-letter code.' })
    }

    const limit = Math.min(
      10,
      Math.max(5, Number.parseInt(req.query.limit, 10) || 6),
    )

    const news = await fetchNewsByCountry(country, limit)
    return res.json(news)
  } catch (error) {
    const status = error?.response?.status

    if (status === 401) {
      return res
        .status(502)
        .json({ error: 'News service authentication failed.' })
    }

    if (status) {
      return res
        .status(502)
        .json({ error: 'News service is unavailable right now.' })
    }

    return next(error)
  }
}

module.exports = { getNewsByCountry }
