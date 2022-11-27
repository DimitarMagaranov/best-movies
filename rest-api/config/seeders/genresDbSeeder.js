const genres = require('../data/genres.js');
const genre = require('../models/genreModel.js');

const dbConnector = require('./db');

dbConnector();

const importGenres = async () => {
	try {
		await genre.deleteMany();

		await genre.insertMany(genres);

		console.log('Genres Imported');
		process.exit();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

const deleteGenres = async () => {
	try {
		await genre.deleteMany();

		console.log('Genres destroyed');
		process.exit();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

switch (process.argv[2]) {
	case '-d': {
		deleteGenres();
		break;
	}
	default: {
		importGenres();
	}
}