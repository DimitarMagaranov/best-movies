const authController = require('./auth');
const movieController = require('./movieController');
const movieForApprovalController = require('./movieForApprovalController');
const genreController = require('./genreController');
const adminController = require('./adminController');
const messageController = require('./messageController');
const contactUsController = require('./contactUsController');

module.exports = {
    authController,
    movieController,
    genreController,
    movieForApprovalController,
    adminController,
    messageController,
    contactUsController
}