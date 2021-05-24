var mongoose = require("mongoose");
require("./airplane-model.js");
var dbURL = "mongodb://localhost:27017/AirplaneDB";

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }); //coonetion created

mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to " + dbURL);
});
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
});
mongoose.connection.on("error", function (err) {   //
    console.log("Mongoose connection error " + err);
});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("Application interruted ");
        process.exit(0);
    });
});
process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        console.log("Application terminated");
        process.exit(0);
    });
});
process.once("SIGUSR2", function () {
    mongoose.connection.close(function () {
        console.log("Application restarted");
        process.kill(process.pid, "SIGUSR2"); //process.pid is
    });
});