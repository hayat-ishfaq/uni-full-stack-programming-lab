<<<<<<< HEAD
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const newsRoutes = require('./routes/NewsRoutes');

let weatherRoutes = null;

try {
	weatherRoutes = require('./routes/WeatherRoutes');
} catch (error) {
	weatherRoutes = null;
}

const app = express();

app.use(express.json());

// Register the news API under its own prefix.
app.use('/api/news', newsRoutes);

// Keep the weather route working when the weather module is present in the project.
if (weatherRoutes) {
	app.use('/api/weather', weatherRoutes);
}

module.exports = app;
=======
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const newsRoutes = require('./routes/NewsRoutes');

let weatherRoutes = null;

try {
	weatherRoutes = require('./routes/WeatherRoutes');
} catch (error) {
	weatherRoutes = null;
}

const app = express();

app.use(express.json());

// Register the news API under its own prefix.
app.use('/api/news', newsRoutes);

// Keep the weather route working when the weather module is present in the project.
if (weatherRoutes) {
	app.use('/api/weather', weatherRoutes);
}

module.exports = app;
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
