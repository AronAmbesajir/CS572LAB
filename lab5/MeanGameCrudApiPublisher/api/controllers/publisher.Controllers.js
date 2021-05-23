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
        res.status(response.status).json(response.message);
    })
};


let _addPublisher = function (req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.country=req.body.country;
    console.log("\nReached !!!\n");
    // game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function (err, updatedGame) {
        const response = { status: 201, message: updatedGame.publisher };
        if (err) {
            reponse.status = 500;
            response.message = err;
        } 
        res.status(response.status).json(response.message);
    });
}

//add publisher
module.exports.publisherAdd = function (req, res) {
    const gameId = req.params.gameId;
   // console.log("Get gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 200, message: [] };
        if (err) {
            console.log("Error finding game");
            response.status = 500; response.message = err;
        } else if (!game) {
            console.log("Game id not found in database", id);
            response.status = 404; response.message = { "message": "Game ID not found" + gameId };
        }
        if (game) {
            _addPublisher(req, res, game);
            
        } else {
            res.status(response.status).json(response.message);
        }
    })
};

const _updatePublisher = function (req, res, game) {
    game.publisher.name = req.body.name;
    // game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function (err, updatePublisher) {
        const response = {
            status: 204,
            message: updatePublisher
        };
        if (err) {
            console.log("Error finding game"); response.status = 500;
        }

        res.status(response.status).json(response.message);
    });
}
module.exports.publisherUpdate = function (req, res) {
    const gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            response.message = err;
            console.log("Error finding game"); response.status = 500;
        } else if (!game) {
            response.status = 404; response.message = { "message": "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            _updatePublisher(req, res, game);
        }
    });
};

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
module.exports.publisherDelete = function (req, res) {
    const gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            console.log("Error finding game"); response.status = 500;
        } else if (!game) {
            response.message = err;
        };
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            // if (!(game.publisher)) {
            //     game.publisher = { name: "empty", location: [] };
            // }
            _deletePublisher(req, res, game);
        }
    });
};