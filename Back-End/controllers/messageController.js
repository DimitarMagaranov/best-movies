const { messageModel } = require('../models/index');

function createMessage(req, res, next) {
    const data = req.body;

    messageModel.create({...data}).then((createdMessage) => {
        res.status(200).send(createdMessage.populate("movieId"));
    });
};

function getMessages(req, res, next) {
    messageModel
        .find()
        .populate("movieId")
        .then((movies) => res.json(movies))
        .catch(next);
}

function deleteMessage(req, res, next) {
    const {messageId} = req.params;

    messageModel.findOneAndDelete({_id: messageId})
        .then((deletedOne) => {
            if (deletedOne) {
                res.status(200).json({message: "Ready!"});
              } else {
                res.status(401).json({ message: "Not allowed!" });
              }
        })
        .catch(next);
};

module.exports = {
    createMessage,
    getMessages,
    deleteMessage
};