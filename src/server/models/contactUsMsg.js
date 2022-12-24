const mongoose = require('mongoose');

const contactUsMsgSchema = new mongoose.Schema({
    personName: { type: String },
    personEmail: { type: String },
    personAnswer: { type: String },
    readed: {type: Boolean}
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('ContactUsMsg', contactUsMsgSchema);