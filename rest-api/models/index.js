const userModel = require('./userModel');
const tokenBlacklistModel = require('./tokenBlacklistModel');
const movieModel = require('./movieModel');
const movieForApprovalModel = require('./movieForApprovalModel');
const genreModel = require('./genreModel');

module.exports = {
    userModel,
    tokenBlacklistModel,
    movieModel,
    genreModel,
    movieForApprovalModel
}