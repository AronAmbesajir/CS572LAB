const mongoose = require("mongoose");
const Game = mongoose.model("Game");

// const runGeoQuery = function (req, res) {
//     const lng = parseFloat(req.query.lng);
//     const lat = parseFloat(req.query.lat);
//     console.log("Geo serach lng ", lng, " lat ", lat);
//     const query = {
//         "publisher.location": {
//             $near: {
//                 $geometry: {
//                     type: "Point",
//                     coordinates: [lng, lat],
//                     $maxDistance: 1000, // or 1000000
//                     $minDistance: 0
//                 }
//             }
//         }
//     }
//     Game.find(query).exec(function (err, games) {
//         if (err) {
//             console.log("Error ", err);
//         }
//         console.log("Found games", games);
//         res.status(200).json(games);
//     });
// };

//get all games 
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

    Game.find().skip(offset).limit(count).exec(function (err, games) {
        console.log("Found games", games.length);
        res.status(200).json(games);
    });
};

//get one game
module.exports.gamesGetOne = function (req, res) {
    const gameId = req.params.gameId; 
    Game.findById(gameId).exec(function (err, game) {
        res.status(200).json(game);
    });
};

//add one game
module.exports.gameAddOne = function (req, res) {
    var response = {
        status: 200,
        message: ""
    };
    let newGame = {};
    
    if (req.body && req.body.title && req.body.price && req.body.rate){
        console.log("Post new game ")
        // Type checkng
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        newGame.rate = parseInt(req.body.rate);

        Game.create(newGame, function (err, game) {
            if (err) {
                response.status = 500;
                response.message = err;
            } else {
                response.message = game;
            }
            console.log("added successfully");
            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 400;
        response.message = { error: "quaest data missing from Post Body" };
        res.status(response.status).json(response.message);

    }
}

//update game
module.exports.gamesUpdateOne = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("-reviews -publisher").exec(function (err, game) {
        const response = {
            status: 204,
            message: game
        };
        if (err) {
            console.log("Error finding game"); 
            response.status = 500; response.message = err;
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
            // game.designer = req.body.designer;
            // game.minPlayers = parseInt(req.body.minPlayers);
            // game.maxPlayers = parseInt(req.body.maxPlayers);
            game.rate = parseInt(req.body.rate); 
            // game.minAge = parseInt(req.body.minAge);
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

//Delet game
module.exports.gamesDeleteOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log("DELETE gameId ", gameId);
    Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
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