const { contactUsMsgModel } = require('../models/index');

function createMessage(req, res, next) {
    const data = req.body;

    contactUsMsgModel.create({personName: data.name, personEmail: data.email, personAnswer: data.answer, readed: false}).then((createdMessage) => {
        res.status(200).send(createdMessage);
    });
};

function getMessage(req, res, next) {
  const {messageId} = req.params._id;
    contactUsMsgModel
    .findById(messageId)
    .then((msg) => res.json(msg))
    .catch(next);
}

function getMessages(req, res, next) {
  contactUsMsgModel
      .find()
      .then((msgs) => res.json(msgs))
      .catch(next);
}

function markAsReaded(req, res, next) {
    const {messageId} = req.params;

    contactUsMsgModel.findOneAndUpdate({ _id: messageId }, { data }, { new: true })
    .then((updatedMessage) => {
        if (updatedMessage) {
          res.status(200).json(updatedMessage);
        } else {
          res.status(401).json({ message: "Not allowed!" });
        }
      })
      .catch(next);
};

module.exports = {
    createMessage,
    getMessages,
    markAsReaded,
    getMessage
};