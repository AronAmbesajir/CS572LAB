const mongoose = require("mongoose");
const Airplane = mongoose.model("AirplaneModel");

//get one airline
module.exports.airlineGetOne = function (req, res) {
    const airId = req.params.airplaneId;
    Airplane.findById(airId).select("airline").exec(function (err, airplane) {
        const response = {
            status: 200,
            message: airplane.airline
        };
        if (err) {
            console.log("Error finding");
            response.status = 500;
            response.message = err;
        } else if (!airplane) {
            response.status = 404;
            response.message = { "message": "airplane ID not found" };
        }
        res.status(response.status).json(response.message);
    });
}


// add airline
module.exports.airlineAddOne = function (req, res) {
    console.log("reached req !!!");
    const airId = req.params.airplaneId;
    Airplane.findById(airId).select("airline").exec(function (err, airplane) {
        const response = {
            status: 200,
            message: airplane.airline
        };
        if (err) {
            console.log("Error finding");
            response.status = 500;
            response.message = err;
        } else if (!airplane) {
            response.status = 404;
            response.message = { "message": "airplane ID not found" };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            // check the datas of airline if all true added to object literal
            if (req.body && req.body.name && req.body.city && req.body.state) {
                const newAirline = {};
                newAirline.name = req.body.name;
                newAirline.city = req.body.city;
                newAirline.state = req.body.state;
                airplane.airline=newAirline;
                airplane.save(function (err, newairline) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        response.message = newairline;
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

//Update airline
module.exports.airlineUpdateOne = function (req, res) {

    const airId = req.params.airplaneId;
    Airplane.findById(airId).select("airline").exec(function (err, airplane) {
        const response = {
            status: 200,
            message: airplane.airline
        };
        if (err) {
            console.log("Error finding");
            response.status = 500;
            response.message = err;
        } else if (!airplane) {
            response.status = 404;
            response.message = { "message": "airplane ID not found" };
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
        } else {
            if (req.body && req.body.name && req.body.city && req.body.state){
                airplane.airline.name = req.body.name;
                airplane.airline.city = req.body.city;
                airplane.airline.state = req.body.state;
                // save after delet airline from airlineess array 
                airplane.save(function (err, updateairline) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        response.message = updateairline;
                    }
                    res.status(response.status).json(response.message);
                });
            }
            else {
                response.status = 400;
                response.message = { error: "data missing from Put Body" };
                res.status(response.status).json(response.message);
            }

        }

    });
}



// Delete airline
module.exports.airlineDeletOne = function (req, res) {
    const airId = req.params.airplaneId;
    Airplane.findById(airId).select("airline").exec(function (err, airplane) {
        const response = {
            status: 200,
            message: airplane.airline
        };
        if(airplane.airline==null){
            response.status = 400;
            response.message = { error: "airplane does not have airline data" };
            res.status(response.status).json(response.message);
        }
        else{
       airplane.airline.remove();
        // save after delet airline from airlineess array 
        airplane.save(function (err, deleteAirline) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
    }
    });
}