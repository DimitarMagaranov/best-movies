import adminData from '../../data/admin';
import { create } from '../../models/userModel';

import dbConnector from '../db';

dbConnector();

const importAdmin = async () => {
	try {
		await create(adminData);

		console.log('admin created');
		process.exit();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

importAdmin();