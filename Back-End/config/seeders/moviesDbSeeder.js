import movies, { map } from '../../data/movies.js';
import { deleteMany, insertMany } from '../../models/movieModel.js';

import dbConnector from '../db';

dbConnector();

const importMovies = async () => {
	try {
		await deleteMany();

		movies = map(obj => ({ ...obj, userId: "639470b26b7b5d69d0d7bdea" }));

		await insertMany(movies);

		console.log('Data Imported');
		process.exit();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

const deleteMovies = async () => {
	try {
		await deleteMany();

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