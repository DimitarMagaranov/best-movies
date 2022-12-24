const adminData = require('../../data/admin');
const model = require('../../models/userModel');

const dbConnector = require('../db');

dbConnector();

const importAdmin = async () => {
	try {
		await model.create(adminData);

		console.log('admin created');
		process.exit();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

importAdmin();