const { userModel } = require("../models/userModel");

function saveMovie(req, res, next) {
  const { movieId } = req.params;
  const { _id: userId } = req.user;

  userModel
    .findByIdAndUpdate(
      { _id: userId },
      { $push: { savedMovies: movieId } },
      { new: true }
    )
    .then((result) => {
      return res.status(201).json({
        status: "Success",
        message: "Resources Are Created Successfully",
        data: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "Failed",
        message: "Database Error",
        data: error,
      });
    });
};

function unsaveMovie(req, res, next) {
    const { movieId } = req.params;
    const { _id: userId } = req.user;
  
    userModel
      .findByIdAndUpdate(
        { _id: userId },
        { $pull: { savedMovies: movieId } }
      )
      .then((result) => {
        return res.status(201).json({
          status: "Success",
          message: "Resources Are Removed Successfully",
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: "Failed",
          message: "Database Error",
          data: error,
        });
      });
  };

module.exports = {
    saveMovie,
    unsaveMovie
};