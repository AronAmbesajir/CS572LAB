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

module.exports.gamesGetAll = function (req, res) {
    let offset = 0;
    let count = 2;
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


module.exports.gamesGetOne = function (req, res) {
    const gameId = req.params.gameId; 
    Game.findById(gameId).exec(function (err, game) {
        res.status(200).json(game);
    });
};

module.exports.gameAddOne = function (req, res) {
    var newGame = {};
    if (req.body && req.body.title && req.body.price) {
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        collection.insertOne(newGame, function (err, response) {
            console.log(response.ops);
            res.status(201).json(response.ops);
        })
    }
}
