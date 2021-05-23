const express= require("express");
const router= express.Router(); 
const controllerGames= require("../controllers/games.controllers.js"); 
const controllerReviews= require("../controllers/reviews.controllers.js");

router.route("/games")
.get(controllerGames.gamesGetAll)
.post(controllerGames.gameAddOne);

router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)
.put(controllerGames.gamesUpdateOne)
.delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/reviews")
.get(controllerReviews.reviewGetAll)
.post(controllerReviews.reviewAddOne);

router.route("/games/:gameId/reviews/:reviewId")
.get(controllerReviews.reviewGetOne)
.put(controllerReviews.reviewUpdateOne)
.delete(controllerReviews.reviewDeleteOne);

module.exports = router;