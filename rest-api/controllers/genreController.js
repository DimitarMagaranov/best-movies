const { genreModel } = require("../models/index");

function getGenres(req, res, next) {
  genreModel
    .find()
    .then((genres) => res.json(genres))
    .catch(next);
};

module.exports = {
  getGenres
}