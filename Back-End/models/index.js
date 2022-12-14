const userModel = require('./userModel');
const tokenBlacklistModel = require('./tokenBlacklistModel');
const movieModel = require('./movieModel');
const movieForApprovalModel = require('./movieForApprovalModel');
const genreModel = require('./genreModel');
const messageModel = require('./message');
const contactUsMsgModel = require('./contactUsMsg');

module.exports = {
    userModel,
    tokenBlacklistModel,
    movieModel,
    genreModel,
    movieForApprovalModel,
    messageModel,
    contactUsMsgModel
}