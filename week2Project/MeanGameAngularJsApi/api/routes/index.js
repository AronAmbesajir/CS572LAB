const express= require("express");
const router= express.Router(); 
const controllerGames= require("../controllers/games.controllers.js"); 
const controllerPublisher= require("../controllers/publisher.controllers.js");
const controllerUser= require("../controllers/users.controllers.js");

router.route("/games")
.get(controllerGames.gamesGetAll)
.post(controllerUser.authenticate,controllerGames.gameAddOne);


router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)
.put(controllerGames.gamesUpdateOne)
.delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publisher")
.get(controllerPublisher.publisherGet)
.post(controllerPublisher.publisherGet)
.put(controllerPublisher.publisherGet)
.delete(controllerPublisher.publisherGet);

router.route("/gamesTitle/:title")
.get(controllerGames.gamesSearch);

router.route("/users")
.get(controllerUser.usersGetAll);

router.route("/users/:userId")
.delete(controllerUser.usersDeleteOne);

router.route("/users/register")
.post(controllerUser.register);
router.route("/users/login")
.post(controllerUser.login); 

module.exports = router;