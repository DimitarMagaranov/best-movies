const { genreModel } = require("../models/index");

function getGenres(req, res, next) {
  genreModel
    .find()
    .then((genres) => res.json(genres))
    .catch(next);
};

function getGenre(req, res, next) {
  const {genreId} = req.params;
  console.log(genreId);

  genreModel.findById(genreId)
    .then((genre) => res.json(genre))
    .catch(next);
}

module.exports = {
  getGenres,
  getGenre
}