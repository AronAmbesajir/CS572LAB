const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.addressGetAll= function(req, res) {
    const gameId= req.params.gameId;
    Student.findById(gameId).exec(function(err, game) {
    res.status(200).json(game.address);
    });
}

module.exports.addressGetOne= function(req, res) {
    const gameId= req.params.gameId;
    Student.findById(gameId).exec(function(err, game) {
    res.status(200).json(game.address);
    });
}