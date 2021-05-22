const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.addressGetAll = function (req, res) {
    const stdId = req.params.studentId;
    Student.findById(stdId).select("address").exec(function (err, student) {
        res.status(200).json(student.address);
    });
}

module.exports.addressGetOne = function (req, res) {
    const stdId = req.params.studentId;
    const zipNum = parseInt(req.params.zipcode);
    Student.findById(stdId).select("address").exec(function (err, student) {
        const oneAdress = student.address.find(adr=>adr.zipcode==zipNum)
        console.log("adress"+oneAdress);
        res.status(200).json(oneAdress);
    });
}