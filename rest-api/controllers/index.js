const authController = require('./auth');
const movieController = require('./movieController');
const movieForApprovalController = require('./movieForApprovalController');
const genreController = require('./genreController');
const adminController = require('./adminController');

module.exports = {
    authController,
    movieController,
    genreController,
    movieForApprovalController,
    adminController
}