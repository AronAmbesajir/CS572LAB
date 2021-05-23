var mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
    "state": String,  //state can be keyword
    city: String,
    zipcode: Number
});
var studentsSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gpa: Number,
    address: [addressSchema]
});
mongoose.model("Student", studentsSchema, "Students");