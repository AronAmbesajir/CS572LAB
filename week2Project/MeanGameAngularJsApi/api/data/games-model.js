const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.Now
    }
});

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        "default": ""
        
    },
    country: {
        type: String,
        required: true,
        "default": ""
    },
    established: {
        type: Date,
        required: false
    },
    // location: {
    //     address: String,
    //     // Store coordinates in order longitude (E/W), latitude (N/S) coordinates: {
    //     type: [Number],
    //     index: "2dsphere"
    // }
});

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,
    designers: [String],
    players: {
        type: Number,
        min: 1,
        max: 10
    }, rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    reviews: [reviewSchema],
    publisher: publisherSchema
});
mongoose.model("Game", gameSchema, "games");

