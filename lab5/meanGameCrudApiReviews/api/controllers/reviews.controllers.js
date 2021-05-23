const mongoose = require("mongoose");
const Game = mongoose.model("Game");

// get all reviews
module.exports.reviewGetAll = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        const response = {
            status: 200,
            message: game.reviews
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else if(!game){
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }

        res.status(response.status).json(response.message);
    });
}


module.exports.reviewGetOne = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + " for gameId " + gameId);
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        const response = {
            status: 200,
            message: game.reviews
        };
        if (err) {
            console.log("Error finding game\n");
            response.status = 500;
            response.message = err;
        }else if(!game){
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        response.message= game.reviews.id(reviewId);
        res.status(response.status).json(response.message);
    });
};

//add Review
module.exports.reviewAddOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        const response = {
            status: 204,
            message: game.reviews
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else if(!game){
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if(response.status!==204){
            res.status(response.status).json(response.message);
        }else{

            console.log("reached !!!");
            if (req.body && req.body.name && req.body.rating && req.body.review) {
                const newReview = {}
                newReview.name = req.body.name;
                newReview.review = req.body.review;
                newReview.rating = parseInt(req.body.rating);
                game.reviews.push(newReview);
                game.save(function (err, newAddress) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        response.message = newAddress;
                    }
                    res.status(response.status).json(response.message);
                });

            }
            else {
                response.status = 400;
                response.message = { error: "data missing from Post Body" };
                res.status(response.status).json(response.message);
            }

        }
    });
}

//update
module.exports.reviewUpdateOne = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    console.log("Updated Reveiwed Id "+reviewId+" in game "+gameId);
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        const response = {
            status: 200,
            message: game.reviews
        };
        if (err) {
            console.log("Error finding game\n");
            response.status = 500;
            response.message = err;
        }else if(!game){
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        const updateReview= game.reviews.id(reviewId);
        const index = game.reviews.indexOf(updateReview);
        game.reviews.splice(index, 1);
        // update process
        updateReview.name = req.body.name;
        updateReview.review = req.body.review;
        updateReview.rating = parseInt(req.body.rating);
        game.reviews[index] = updateReview;

        // save after delet adrress from addressess array 
        game.save(function (err, pass) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            else {
                response.message=updateReview;
            }
            res.status(response.status).json(response.message);
        });
    });
};

//delet review
module.exports.reviewDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    console.log("Deleted Reveiwed Id "+reviewId+" in game "+gameId);
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        const response = {
            status: 200,
            message: game.reviews
        };
        if (err) {
            console.log("Error finding game\n");
            response.status = 500;
            response.message = err;
        }else if(!game){
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        const oneReview= game.reviews.id(reviewId);
        const index = game.reviews.indexOf(oneReview);
        game.reviews.splice(index, 1);

        // save after delet adrress from addressess array 
        game.save(function (err, pass) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            else {
                response.message=oneReview;
            }
            res.status(response.status).json(response.message);
        });
    });
};