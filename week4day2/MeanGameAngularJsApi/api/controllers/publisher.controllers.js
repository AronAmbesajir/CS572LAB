const mongoose = require("mongoose");
const Game = mongoose.model("Game");

// get publisher
module.exports.publisherGet = function (req, res) {
    const gameId = req.params.gameId;
    console.log("Get gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 200, message: game.publisher };
        if (err) {
            console.log("Error finding game");
            response.status = 500; response.message = err;
        } else if (!game) {
            console.log("Game id not found in database", id);
            response.status = 404;
            response.message = { "message": "Game ID not found" + gameId };
        }
        if (req.method == "GET") { 
            res.status(response.status).json(response.message); }
        else if (req.method == "POST") {
            _addPublisher(req, res, game);
         }
        else if(req.method=="PUT"){
            _updatePublisher(req, res, game);
        }
        else if(req.method=="DELETE"){
            _deletePublisher(req, res, game);
        }
        //res.status(response.status).json(response.message);
    })
};

//add publisher
let _addPublisher = function (req, res, game) {
    const newPublisher = {};

    newPublisher.name = req.body.name;
    newPublisher.country = req.body.country;
    game.publisher = newPublisher;
    console.log("\nReached !!!\n");
    // game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function (err, updatedGame) {
        const response = { status: 201, message: updatedGame };
        console.log("\nReached !!!\n");
        if (err) {
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}


//update publisher
const _updatePublisher = function (req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.country=req.body.country;
    // game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function (err, updatePublisher) {
        const response = {
            status: 204,
            message: updatePublisher
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    });
}


// delelt publisher 
const _deletePublisher = function (req, res, game) {
    game.publisher.remove();
    game.save(function (err, game) {
        const response = {
            status: 204,
            message: game
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}
