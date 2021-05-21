const dbConnection = require("../data/dbconnection.js");
const ObjectId= require("mongodb").ObjectId;

module.exports.gamesGetAll = function (req, res) {
    const db = dbConnection.get();
     console.log("db", db);
    const collection = db.collection("games");
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
}

module.exports.gamesGetOne = function (req, res) {
    const db = dbConnection.get();
    console.log("db", db);
    const collection = db.collection("games");
    const gameId = req.params.gameId;
    collection.findOne({_id : ObjectId(gameId)}, function(err, doc) {
        console.log("Found game", doc);
        res.status(200).json(doc); 
    })
}



