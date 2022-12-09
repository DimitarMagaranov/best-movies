const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    ranking: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    released: {
        type: String,
        required: true
    },
    runtime: {
        type: String,
        required: true
    },
    genres: [{
        type: ObjectId,
        ref: "Genre"
    }],
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
    language: {
        type: String,
        required: true
    },
    country: {
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
        required: Number
    },
    imdbID: {
        type: String
    },
    imdbLink: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Movie', movieSchema);