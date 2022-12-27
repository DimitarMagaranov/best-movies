const { movieForApprovalModel, userModel } = require("../models/index");

function getMovies(req, res, next) {
  movieForApprovalModel
    .find()
    .populate("userId")
    .then((movies) => res.json(movies))
    .catch(next);
};

function getMovie(req, res, next) {
  const { movieId } = req.params;

  movieForApprovalModel
    .findById(movieId)
    .populate("userId")
    .populate("genres")
    .then((movies) => res.json(movies))
    .catch(next);
};

function createMovie(req, res, next) {
  const data = req.body;
  data.isApproved = false;
  const { _id: userId } = req.user;

  movieForApprovalModel.create({ ...data, userId }).then((createdMovie) => {
    res.status(200).send(createdMovie.populate("genres"));
  });
};

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const { _id: userId } = req.user;

  Promise.all([
    movieForApprovalModel.findOneAndDelete({ _id: movieId, userId }),
    movieForApprovalModel.findOneAndUpdate({ _id: userId }, { $pull: { movies: movieId } }),
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
    deleteMovie
}
