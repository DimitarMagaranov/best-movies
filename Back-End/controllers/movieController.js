const paginate = require("jw-paginate");

const { movieModel, userModel } = require("../models/index");

function getMovies(req, res, next) {
  movieModel
    .find()
    .populate("userId")
    .then((movies) => res.json(movies))
    .catch(next);
};

function getMoviesWithPagination(req, res, next) {
  let movies = movieModel
  .find()
  .populate("userId")
  .then((data) => {
    movies = data;
    const page = parseInt(req.query.page) || 1;

    const pageSize = 16;

    const pager = paginate(movies.length, page, pageSize);

    const pageOfItems = Array.from(movies).slice(pager.startIndex, pager.endIndex + 1);

    res.json({pager, pageOfItems});
  })
  .catch(next);
};

function getMovie(req, res, next) {
  const { movieId } = req.params;

  movieModel
    .findById(movieId)
    .populate("userId")
    .populate("genres")
    .then((movies) => res.json(movies))
    .catch(next);
};

function createMovie(req, res, next) {
  const data = req.body;
  const { _id: userId } = req.user;

  movieModel.create({ ...data, userId }).then((createdMovie) => {
    res.status(200).send(createdMovie.populate("genres"));
  });
};

function editMovie(req, res, next) {
  const { movieId } = req.params;
  const { _id: userId } = req.user;
  const data = req.body;

  movieModel
    .findOneAndUpdate({ _id: movieId, userId }, { data }, { new: true })
    .then((updatedMovie) => {
      if (updatedMovie) {
        res.status(200).json(updatedMovie);
      } else {
        res.status(401).json({ message: "Not allowed!" });
      }
    })
    .catch(next);
};

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const { _id: userId } = req.user;

  Promise.all([
    movieModel.findOneAndDelete({ _id: movieId, userId }),
    userModel.findOneAndUpdate({ _id: userId }, { $pull: { movies: movieId } }),
  ])
    .then(([deletedOne, _, __]) => {
      if (deletedOne) {
        res.status(200).json(deletedOne);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
};

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    editMovie,
    deleteMovie,
    getMoviesWithPagination
}
