const express= require("express");
const router= express.Router(); 
const controllerAirplane= require("../controllers/airplane.controllers.js");
const controllerAirline= require("../controllers/airline.controllers.js");
const controllerUser= require("../controllers/users.controllers.js");

router.route("/airplanes")
.get(controllerAirplane.airplaneGetAll)
.post(controllerUser.authenticate,controllerAirplane.airplaneAddOne);

router.route("/airplanes/:airplaneId")
.get(controllerAirplane.airplaneGetOne)
.put(controllerAirplane.airplaneUpdateOne)
.delete(controllerAirplane.airplaneDeleteOne);

router.route("/airplanes/:airplaneId/airline")
.get(controllerAirline.airlineGetOne)
.post(controllerAirline.airlineAddOne)
.put(controllerAirline.airlineUpdateOne)
.delete(controllerAirline.airlineDeletOne);

router.route("/airplanesModel/:modelNum")
.get(controllerAirplane.airplaneSearch);

router.route("/users")
.get(controllerUser.usersGetAll);

router.route("/users/:userId")
.delete(controllerUser.usersDeleteOne);

router.route("/users/register")
.post(controllerUser.register);
router.route("/users/login")
.post(controllerUser.login); 

module.exports = router;