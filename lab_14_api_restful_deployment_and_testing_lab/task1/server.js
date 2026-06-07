<<<<<<< HEAD
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 5000;

if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`Weather API server is running on port ${PORT}`);
	});
}

module.exports = app;
=======
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 5000;

if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`Weather API server is running on port ${PORT}`);
	});
}

module.exports = app;
>>>>>>> c8eef5b0f76ceef6ce860885c7d9eea8dbce729c
