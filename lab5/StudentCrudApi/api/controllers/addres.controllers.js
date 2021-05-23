const mongoose = require("mongoose");
const Student = mongoose.model("Student");

//get all address
module.exports.addressGetAll = function (req, res) {
    const stdId = req.params.studentId;
    Student.findById(stdId).select("address").exec(function (err, student) {
        res.status(200).json(student);
    });
}

//get one address
module.exports.addressGetOne = function (req, res) {
    const stdId = req.params.studentId;
    const zipNum = parseInt(req.params.zipcode);
    Student.findById(stdId).select("address").exec(function (err, student) {
        const oneAdress = student.address.find(adr => adr.zipcode == zipNum)
        console.log("adress" + oneAdress);
        res.status(200).json(oneAdress);
    });
}


// add address
module.exports.addressAddOne = function (req, res) {
    console.log("reached req !!!");
    const stdId = req.params.studentId;
    Student.findById(stdId).select("address").exec(function (err, student) {
        const response = {
            status: 200,
            message: student
        };
        if (err) {
            console.log("Error finding");
            response.status = 500;
            response.message = err;
        } else if (!student) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            console.log("reached !!!");
            if (req.body && req.body.state && req.body.city && req.body.zipcode) {
                const newAdd = {}
                newAdd.state = req.body.state;
                newAdd.city = req.body.city;
                newAdd.zipcode = parseInt(req.body.zipcode);
                student.address.push(newAdd);
                student.save(function (err, newAddress) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        response.message = newAddress;
                    }
                    res.status(response.status).json(response.message);
                });

            }
            else {
                response.status = 400;
                response.message = { error: "data missing from Post Body" };
                res.status(response.status).json(response.message);
            }
        }

        if (req.body && req.body.state && req.body.city && req.body.zipcode) { }
        else {

        }

    });
}


module.exports.addressUpdateOne = function (req, res) {

    const stdId = req.params.studentId;
    const zipNum = parseInt(req.params.zipcode);
    Student.findById(stdId).select("address").exec(function (err, student) {
        const response = {
            status: 200,
            message: student
        };
        if (err) {
            console.log("Error finding");
            response.status = 500;
            response.message = err;
        } else if (!student) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            console.log("reached !!!");
            if (req.body && req.body.state && req.body.city && req.body.zipcode) {
                const updateAdress = student.address.find(adr => adr.zipcode == zipNum);
                const index = student.address.indexOf(updateAdress);
                console.log("index ", index)
                student.address.splice(index, 1);
                // update process
                updateAdress.state = req.body.state;
                updateAdress.city = req.body.city;
                updateAdress.zipcode = parseInt(req.body.zipcode);
                student.address[index] = updateAdress;
                console.log("adress" + student.address);

                // save after delet adrress from addressess array 
                student.save(function (err, pass) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        response.message = updateAdress;
                    }
                    res.status(response.status).json(response.message);
                });
            }
            else {
                response.status = 400;
                response.message = { error: "data missing from Post Body" };
                res.status(response.status).json(response.message);
            }

        }

    });
}

// Delete Address
module.exports.addressDeletOne = function (req, res) {

    const stdId = req.params.studentId;
    const zipNum = parseInt(req.params.zipcode);
    Student.findById(stdId).select("address").exec(function (err, student) {
        const response = {
            status: 200,
            message: student
        };
        const deletAdress = student.address.find(adr => adr.zipcode == zipNum);
        const index = student.address.indexOf(deletAdress);
        console.log("index ", index)
        student.address.splice(index, 1);

        console.log("adress" + student.address);

        // save after delet adrress from addressess array 
        student.save(function (err, pass) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            else {
                response.message = deletAdress;
            }
            res.status(response.status).json(response.message);
        });

    });
}