const movies = require('../data/movies.js');
const movie = require('../models/movieModel.js');

const dbConnector = require('./db');

dbConnector();

const importMovies = async () => {
	try {
		await movie.deleteMany();

		await movie.insertMany(movies);

		console.log('Data Imported');
		process.exit();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

const deleteMovies = async () => {
	try {
		await movie.deleteMany();

		console.log('Data destroyed');
		process.exit();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

switch (process.argv[2]) {
	case '-d': {
		deleteMovies();
		break;
	}
	default: {
		importMovies();
	}
}