const express= require("express");
const router= express.Router(); 
const controllerStudent= require("../controllers/students.controllers.js");
const controllerAddress= require("../controllers/addres.controllers.js"); 

router.route("/students")
.get(controllerStudent.studentsGetAll)
.post(controllerStudent.StudentsAddOne)
;
;
router.route("/students/:studentId")
.get(controllerStudent.studentsGetOne)
.put(controllerStudent.StudentsUpdateOne)
.delete(controllerStudent.StudentsDeleteOne)
;

router.route("/students/:studentId/address").
get(controllerAddress.addressGetAll)
.post(controllerAddress.addressAddOne);


router.route("/students/:studentId/address/:zipcode")
.get(controllerAddress.addressGetOne)
.put(controllerAddress.addressUpdateOne)
.delete(controllerAddress.addressDeletOne);
module.exports = router;