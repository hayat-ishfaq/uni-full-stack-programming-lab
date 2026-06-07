<<<<<<< HEAD
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const weatherRoutes = require('./routes/WeatherRoutes');

const app = express();

app.use(express.json());

// Register the weather routes under the API prefix.
app.use('/api/weather', weatherRoutes);

module.exports = app;
=======
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const weatherRoutes = require('./routes/WeatherRoutes');

const app = express();

app.use(express.json());

// Register the weather routes under the API prefix.
app.use('/api/weather', weatherRoutes);

module.exports = app;
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
