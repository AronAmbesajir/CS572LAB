const dbConnection = require("../data/dbconnection.js");
//const gamesData = require("../data/games-data.json");
const ObjectId= require("mongodb").ObjectId;

// dbConnection.open();
const db = dbConnection.get();
console.log("db", db);
module.exports.gamesGetAll = function (req, res) {
    //const collection = db.collection("games");
    var offset = 0;
    var count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    collection.find().skip(offset).limit(count).toArray(function (err, docs) {
        console.log("Found games", docs);
        res.status(200).json(docs);
    })
    console.log("GET the games");
    console.log(req.query);

    // const pageGames = gamesData.slice(offset, offset + count);
    // res.status(200).json(pageGames);
}

module.exports.gamesGetOne = function (req, res) {
    const collection = db.collection("games");
    const gameId = req.params.gameId;
    collection.findOne({_id : ObjectId(gameId)}, function(err, doc) {
        console.log("Found game", doc);
        res.status(200).json(doc); 
    })
    // const theGame = gamesData[gameId];
    // console.log("GET game with gameId ", gameId);
    // res.status(200).json(theGame);
}

module.exports.gameAddOne = function (req, res) {
var newGame= {};
if (req.body && req.body.title&& req.body.price) { 
    newGame.title= req.body.title;
    newGame.price= parseFloat(req.body.price); 
    collection.insertOne(newGame, function(err, response) {
    console.log(response.ops);
    res.status(201).json(response.ops); })
} 
}

