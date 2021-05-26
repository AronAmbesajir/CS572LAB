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

app.use(function (req, res, next) {   //log in
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routes);  //start routing 

const server = app.listen(app.get("port"), function () {
    const port = server.address().port;
    console.log("Listening to port " + port);
});
