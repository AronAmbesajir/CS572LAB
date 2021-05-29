const express= require("express");
const router= express.Router(); 
const controllerJob= require("../controllers/job.controllers.js");
// const controllerAirline= require("../controllers/airline.controllers.js"); 

router.route("/jobs")
.get(controllerJob.jobGetAll)
.post(controllerJob.jobAddOne);

router.route("/jobs/:jobId")
.get(controllerJob.jobGetOne)
.put(controllerJob.jobUpdateOne)
.delete(controllerJob.jobDeleteOne);

// router.route("/jobs/:jobId/airline")
// .get(controllerAirline.airlineGetOne)
// .post(controllerAirline.airlineAddOne)
// .put(controllerAirline.airlineUpdateOne)
// .delete(controllerAirline.airlineDeletOne);

module.exports = router;