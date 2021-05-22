const express= require("express");
const router= express.Router(); 
const controllerStudent= require("../controllers/students.controllers.js");
const controllerAddress= require("../controllers/addres.controllers.js"); 
router.route("/students").get(controllerStudent.studentsGetAll);
router.route("/students/:studentId").get(controllerStudent.studentsGetOne);
router.route("/students/:studentId/address").get(controllerAddress.addressGetAll);
router.route("/students/:studentId/address/:zipcode").get(controllerAddress.addressGetOne);
module.exports = router;