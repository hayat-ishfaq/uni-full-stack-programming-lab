const express = require('express')

const weatherRoutes = require('./routes/weatherRoutes')
const newsRoutes = require('./routes/newsRoutes')
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandlers')

const app = express()

app.use(express.json())

app.get('/api', (req, res) => {
  res.json({
    message: 'Lab 13 APIs',
    endpoints: {
      weather: '/api/weather/:city',
      news: '/api/news/:country',
    },
  })
})

app.use('/api/weather', weatherRoutes)
app.use('/api/news', newsRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
