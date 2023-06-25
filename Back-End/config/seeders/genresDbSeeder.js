import genres from '../../data/genres';
import { deleteMany, insertMany } from '../../models/genreModel.js';

import dbConnector from '../db';

dbConnector();

const importGenres = async () => {
	try {
		await deleteMany();

		await insertMany(genres);

		console.log('Genres Imported');
		process.exit();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

const deleteGenres = async () => {
	try {
		await deleteMany();

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