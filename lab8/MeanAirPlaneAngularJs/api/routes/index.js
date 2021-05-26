const express= require("express");
const router= express.Router(); 
const controllerAirplane= require("../controllers/airplane.controllers.js");
const controllerAirline= require("../controllers/airline.controllers.js"); 

router.route("/airplanes")
.get(controllerAirplane.airplaneGetAll)
.post(controllerAirplane.airplaneAddOne);

router.route("/airplanes/:airplaneId")
.get(controllerAirplane.airplaneGetOne)
.put(controllerAirplane.airplaneUpdateOne)
.delete(controllerAirplane.airplaneDeleteOne);

router.route("/airplanes/:airplaneId/airline")
.get(controllerAirline.airlineGetOne)
.post(controllerAirline.airlineAddOne)
.put(controllerAirline.airlineUpdateOne)
.delete(controllerAirline.airlineDeletOne);

module.exports = router;