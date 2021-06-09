require("./api/data/db.js");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./api/routes");

const app = express();

app.set("port", 3000);

//Here I configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(function (req, res, next) {   //log in
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(("/node_modules", express.static(path.join(__dirname, "node_modules"))));
app.use(express.json({extended : false}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Headers","X-Requested-with, content-Type, Accept");
    next();
});

app.use("/api", routes);  //start routing 
const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    console.log("Listening to port " + port);
});
