const { movieForApprovalModel, userModel } = require("../models/index");

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
//   const { _id: userId } = req.user;

  Promise.all([
    movieForApprovalModel.findOneAndDelete({ _id: movieId }),
    // movieForApprovalModel.findOneAndUpdate({ _id: userId }, { $pull: { movies: movieId } }),
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
    deleteMovie
}