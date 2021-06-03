var mongoose = require("mongoose");
const airlineSchema = new mongoose.Schema({
    name: String,  //state can be keyword
    city: String,
    "state": String
});
var airplaneSchema = new mongoose.Schema({
    modelNum: {
        type: String,
        required: true
    },
    manufacture: String,
    capacity: {
        type: Number,
        required:true
    },
    airline: airlineSchema
});
mongoose.model("AirplaneModel", airplaneSchema, "Airplane");