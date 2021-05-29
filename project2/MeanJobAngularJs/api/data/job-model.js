var mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
    longitud: Number,  
    latitud: Number
});
var jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    experience:String,
    salary: {
        type: Number,
        required:true
    },
    postDate:{
        type:Date,
        defaul: new Date()
    },
    location: locationSchema,
    skills:[]
});
mongoose.model("JobModel", jobSchema, "jobs");