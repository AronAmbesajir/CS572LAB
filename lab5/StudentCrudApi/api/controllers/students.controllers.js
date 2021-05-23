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
        console.log("Found Students ");
        res.status(200).json(students);
    });
};


module.exports.studentsGetOne = function (req, res) {
    const stdId = req.params.studentId;
    Student.findById(stdId).exec(function (err, student) {
        res.status(200).json(student);
    });
}

module.exports.StudentsAddOne = function (req, res) {
    var response = {
        status: 200,
        message: ""
    };
    let newStudent = {};
    console.log(req.body);
    if (req.body && req.body.name && req.body.gpa) {
        console.log("Post new student ")
        // Type checkng
        newStudent.name = req.body.name;
        newStudent.gpa = parseFloat(req.body.gpa);
        newStudent.address = [];

        Student.create(newStudent, function (err, student) {
            if (err) {
                response.status = 500;
                response.message = err;
            } else {
                response.message = student;
            }
            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 400;
        response.message = { error: "data missing from Post Body" };
        res.status(response.status).json(response.message);

    }
}

module.exports.StudentsUpdateOne = function (req, res) {
    const StudentId = req.params.studentId;
    Student.findById(StudentId).select("-address").exec(function (err, student) {
        const response = {
            status:204,
            message:student
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!student) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else { // patch method
            console.log("reached !!!");
            // console.log(response.message);
            // res.status(response.status).json(response.message );
            if (req.body && req.body.name && req.body.gpa) {
                student.name = req.body.name;
                student.gpa = parseFloat(req.body.gpa);
                student.save(function (err, updatedStudent) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        response.message = updatedStudent;
                    }
                    res.status(response.status).json(response.message);
                });
            } else {
                response.status = 400;
                response.message = { error: "data missing from Post Body" };
                res.status(response.status).json(response.message);
            }
        }
    });
};

module.exports.StudentsDeleteOne = function (req, res) {
    const StudentId = req.params.studentId;
    console.log("DELETE studentId ", StudentId);
    Student.findByIdAndRemove(StudentId).exec(function (err, deletedStudent) {
        const response = {
            status: 204,
            message: deletedStudent
        };
        if (err) {
            console.log("Error finding student");
            response.status = 500;
            response.message = err;
        } else if (!deletedStudent) {
            response.status = 404;
            response.message = { "message": "student ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};
