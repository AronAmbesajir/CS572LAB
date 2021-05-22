const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentsGetAll = function (req, res) {
    var offset = 0;
    var count = 3;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    Student.find().skip(offset).limit(count).exec(function (err, students) {
        console.log("Found Students ", students);
        res.status(200).json(students);
    });
};


module.exports.studentsGetOne= function(req, res) {
const stdId= req.params.studentId;
Student.findById(stdId).exec(function(err, student) {
res.status(200).json(student);
});
}
