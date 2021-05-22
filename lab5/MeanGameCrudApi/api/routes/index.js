const express=require("express");
require("../data/games-model");
const Router=express.Router();
const controllerGames=require("../controllers/games.controllers.js");

Router.route("/games").get(controllerGames.gamesGetAll)
.post(controllerGames.gameAddOne);

Router.route("/games/:gameId").get(controllerGames.gamesGetOne)
.put(controllerGames.gamesUpdateOne)
.delete(controllerGames.gameDeleteOne);

Router.route("/games/:gameId/publisher").get(controllerPublisher.publisherGet)
.post(controllerPublisher.publisherAdd)
.put(controllerPublisher.publisherUpdate)
.delete(controllerPublisher.publisherDelete);


module.exports = Router;