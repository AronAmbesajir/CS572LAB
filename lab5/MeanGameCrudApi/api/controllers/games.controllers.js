
const mongoose = require("mongoose");
const Game = mongoose.model("Game");



module.exports.gamesGetAll = function (req, res) {
    const defaultOffset = 0;
    const defaultCount = 5;
    let offset = defaultOffset;
    let count = defaultCount;
    const maxCount = 10;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    // number check
    if (isNaN(offset) || isNaN(count)) {

        res.status(400).json({ "message": "Query string count and offset should be numbers" });
        return;
    }
    // limit check
    if (count > maxCount) {
        res.status(400).json({ "message": "Query string count cannot execeed " + maxCount });
        return;
    }
    Game.find().skip(offset).limit(count).exec(function (err, games) {
        // check error
        if (err) {
            console.log("Error finding games");


            res.status(500).json(err);
        }
        else {
            console.log("Found games", games.length);
            res.status(200).json(games);
        }
    });
}

module.exports.gamesGetOne = function (req, res) {
    var gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game) {
        var response = {
            status: 200,
            message: game
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = "Error Message" + err;
        } else if (!game) {  // result check if the id object incorrect
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};


module.exports.gameAddOne = function (req, res) {
    var response = {
        status: 200,
        message: ""
    };
    let newGame = {};
    console.log(req.body);
    if (req.body && req.body.title && req.body.price && req.body.rate) {
        console.log("Post new game ")
        // Type checkng
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        newGame.rate = parseFloat(req.body.rate);

        Game.create(newGame, function (err, game) {
            if (err) {
                response.status = 500;
                response.message = err;
            } else {
                response.message = game;
            }
            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 400;
        response.message = { error: "quaest data missing from Post Body" };
        res.status(response.status).json(response.message);

    }
}

module.exports.gamesUpdateOne = function (req, res) {

    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function (err, game) {
        const response = {
            status: 204,
            message: game
        };
        if (err) {
            console.log("Error finding game"); response.status = 500; response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else { // patch method
            game.title = req.body.title;
            game.year = parseInt(req.body.year);
            game.price = parseFloat(req.body.price);
            game.designer = req.body.designer;
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.rate = parseFloat(req.body.rate); game.minAge = parseInt(req.body.minAge);
            game.save(function (err, updatedGame) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                else {
                    response.message = updatedGame;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
};

module.exports.gamesDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("DELETE gameId ", gameId);
    Game.findByIdAndRemove(gameId).exec(function (err, deletedGame) {

        const response = {
            status: 204,
            message: deletedGame
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!deletedGame) {
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};