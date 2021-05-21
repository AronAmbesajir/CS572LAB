var mongoose= require("mongoose");

const addressSchema=new mongoose.Schema({
    state:String,
    city:String,
    zipcode:Number
});
var studentsSchema= mongoose.Schema({
name : {
    type:String,
    required:true
},
grade :Number,
address:addressSchema
});
mongoose.model("Student", studentsSchema, "students");