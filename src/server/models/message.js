const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
    userId: { type: String },
    movieId: {
        type: ObjectId,
        ref: "MovieForApproval"
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Message', messageSchema);