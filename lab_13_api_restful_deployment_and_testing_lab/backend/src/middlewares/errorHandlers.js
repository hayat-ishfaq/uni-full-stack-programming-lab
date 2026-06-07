function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Route not found.' })
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error.'

  res.status(statusCode).json({ error: message })
}

module.exports = { notFoundHandler, errorHandler }
