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

function getUsers(req, res, next) {
  userModel.find()
  .then((data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(204).json({message: 'No content'});
    }
  })
  .catch(next);
}

function deleteUser(req, res, next) {
  const {userId} = req.params;
  userModel.findOneAndDelete({_id: userId})
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({message: 'User is deleted!'});
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

module.exports = {
  approveMovie,
  getUsers,
  deleteUser
}