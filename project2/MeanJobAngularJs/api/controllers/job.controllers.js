//const { response } = require("express");
const mongoose = require("mongoose");
const Job = mongoose.model("JobModel");


//get all jobs
module.exports.jobGetAll = function (req, res) {
    var offset = 0;
    var count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    Job.find().skip(offset).limit(count).exec(function (err, jobs) {
        const response = {
            status: 200,
            message: jobs
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!jobs) {
            response.status = 400;
            response.message = { error: "No Content" };
        }
        console.log("Found jobs ");
        res.status(response.status).json(response.message);
    });
};

//get one job
module.exports.jobGetOne = function (req, res) {
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function (err, job) {
        const response = {
            status: 200,
            message: job
        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!job) {
            response.status = 400;
            response.message = { error: "No Content" };
        }
        console.log("Found job ");
        res.status(response.status).json(response.message);
    });
}

// add job
module.exports.jobAddOne = function (req, res) {
    var response = {
        status: 200,
        message: ""
    };
    const newJob = {};

    // check all the datas of job
    console.log(req.body);

    if (req.body && req.body.title && req.body.salary && req.body.description && req.body.experience && req.body.skill) {
        const newJobLoc = {};
        // check the datas of jobline if all true added to object literal
        if (req.body.location && req.body.location.latitud && req.body.location.longitud) {
            newJobLoc.latitud = parseFloat(req.body.location.latitud);
            newJobLoc.longitud =parseFloat (req.body.location.longitud);
        }
        console.log("Post new job ")
        // Type checkng
        newJob.title = req.body.title;
        newJob.salary = parseFloat(req.body.salary);
        newJob.description = req.body.description;
        newJob.experience = req.body.experience;
        newJob.postDate = req.body.postDate;
        newJob.skills=[];
        newJob.skills.push(req.body.skill);
        newJob.location = newJobLoc;

        Job.create(newJob, function (err, job) {
            response.message = job;
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

module.exports.jobUpdateOne = function (req, res) {
    const jobId = req.params.jobId;
    Job.findById(jobId).select("-location").exec(function (err, job) {
        const response = {
            status: 204,
            message: job
        };
        if (err) {
            console.log("Error finding");
            response.status = 500;
            response.message = err;
        } else if (!job) {
            response.status = 404;
            response.message = { "message": "job ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else { // patch method
            if (req.body && req.body.title && req.body.salary && req.body.description && req.body.experience  && req.body.skill) {
                console.log("Put new job ")
                const newJobLoc = {};
                // check the datas of jobline if all true added to object literal
                if (req.body.location && req.body.location.latitud && req.body.location.longitud) {
                    newJobLoc.latitud = parseFloat (req.body.location.latitud);
                    newJobLoc.longitud = parseFloat (req.body.location.longitud);
                }
                // Type checkng
                job.title = req.body.title;
                job.salary = parseFloat(req.body.salary);
                job.description = req.body.description;
                job.experience = req.body.experience;
                job.postDate = req.body.postDate;
                job.skills=[];
                job.skills.push(req.body.skill);
                job.location = newJobLoc;
                job.save(function (err, updatedjob) {
                    response.message = updatedjob;
                    if (err) {
                        response.status = 500;
                        response.message = err;
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

module.exports.jobDeleteOne = function (req, res) {
    const jobId = req.params.jobId;
    console.log("DELETE jobplneId ", jobId);
    Job.findByIdAndRemove(jobId).exec(function (err, deletedjob) {
        const response = {
            status: 204,
            message: deletedjob
        };
        if (err) {
            console.log("Error finding job");
            response.status = 500;
            response.message = err;
        } else if (!deletedjob) {
            response.status = 404;
            response.message = { "message": "job ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};
