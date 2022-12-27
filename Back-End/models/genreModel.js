const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Genre', genreSchema);