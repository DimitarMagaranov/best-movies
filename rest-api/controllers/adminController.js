const { movieForApprovalModel, userModel } = require("../models/index");

function approveMovie(req, res, next) {
  const { movieId } = req.params;
  movieForApprovalModel
    .findOneAndUpdate({ _id: movieId }, { isApproved: true })
    .then((updatedMovie) => {
      if (updatedMovie) {
        res.status(200).json(updatedMovie);
      } else {
        res.status(401).json({ message: "Not allowed!" });
      }
    })
    .catch(next);
};

module.exports = {
  approveMovie
}