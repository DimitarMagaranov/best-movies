const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    trailerLink: {
        type: String,
        required: true
    },
    imdbRating: {
        type: Number,
        required: true
    },
    imdbLink: {
        type: String,
        // required: true
    },
    imdbID: {
        type: String
    },
    genres: [{
        type: ObjectId,
        ref: "Genre"
    }]
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Movie', movieSchema);