//const { response } = require("express");
const mongoose = require("mongoose");
const Airplane = mongoose.model("AirplaneModel");


//get all airplanes
module.exports.airplaneGetAll = function (req, res) {
    var offset = 0;
    var count = 15;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    Airplane.find().skip(offset).limit(count).exec(function (err,airplanes) {
       const response={
            status:200,
            message:airplanes
        }
        if(err){
            response.status=500;
            response.message=err;
        }else if(!airplanes){
            response.status=400;
            response.message={error:"No Content"};  
        }
        console.log("Found Airplanes ");
        res.status(response.status).json(response.message);
    });
};

//get one airplane
module.exports.airplaneGetOne = function (req, res) {
    const airId = req.params.airplaneId;
    Airplane.findById(airId).exec(function (err, airplane) {
        const response={
            status:200,
            message:airplane
        }
        if(err){
            response.status=500;
            response.message=err;
        }else if(!airplane){
            response.status=400;
            response.message={error:"No Content"};  
        }
        console.log("Found Airplane ");
        res.status(response.status).json(response.message);
    });
}

// add airplane
module.exports.airplaneAddOne = function (req, res) {
    var response = {
        status: 200,
        message: ""
    };
    const newAirplane = {};
    
    // check all the datas of airplane
    console.log(req.body);
    console.log(req.body.airline.name)
    if (req.body && req.body.modelNum && req.body.capacity &&req.body.manufacture) {
        const newAirline = {};
    // check the datas of airline if all true added to object literal
    if (req.body.airline){
        newAirline.name=req.body.airline.name;
        newAirline.city=req.body.airline.city;
        newAirline.state=req.body.airline.state;
    }
        console.log("Post new airplane ")
        // Type checkng
        newAirplane.modelNum = req.body.modelNum;
        newAirplane.capacity = parseInt(req.body.capacity);
        newAirplane.manufacture=req.body.manufacture;
        newAirplane.airline=newAirline;

        Airplane.create(newAirplane, function (err, airplane) {
            response.message = airplane;
            if (err) {
                response.status = 500;
                response.message = err;
            } 
            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 400;
        response.message = { error: "data missing from Post Body" };
        res.status(response.status).json(response.message);

    }
}

module.exports.airplaneUpdateOne = function (req, res) {
    const airId = req.params.airplaneId;
    Airplane.findById(airId).select("-airline").exec(function (err, airplane) {
        const response = {
            status:204,
            message:airplane
        };
        if (err) {
            console.log("Error finding airplne");
            response.status = 500;
            response.message = err;
        } else if (!airplane) {
            response.status = 404;
            response.message = { "message": "Airplane ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else { // patch method
            if (req.body && req.body.modelNum && req.body.capacity &&req.body.manufacture) {
                console.log("Put new airplane ")
                // Type checkng
                airplane.modelNum = req.body.modelNum;
                airplane.capacity = parseInt(req.body.capacity);
                airplane.manufacture=req.body.manufacture;
                airplane.save(function (err, updatedAirplane) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        response.message = updatedAirplane;
                    }
                    res.status(response.status).json(response.message);
                });
            } else {
                response.status = 400;
                response.message = { error: "data missing from Put Body" };
                res.status(response.status).json(response.message);
            }
        }
    });
};

module.exports.airplaneDeleteOne = function (req, res) {
    const airId = req.params.airplaneId;
    console.log("DELETE AirplneId ", airId);
    Airplane.findByIdAndRemove(airId).exec(function (err, deletedAirplane) {
        const response = {
            status: 204,
            message: deletedAirplane
        };
        if (err) {
            console.log("Error finding airPlane");
            response.status = 500;
            response.message = err;
        } else if (!deletedAirplane) {
            response.status = 404;
            response.message = { "message": "airplane ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};
