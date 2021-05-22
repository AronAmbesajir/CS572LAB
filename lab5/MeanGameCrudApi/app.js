const mongoose=require("mongoose");
require("./api/data/db.js");
let express = require("express");
let app = express();
let path = require("path");
let routes = require("./api/routes");
// const { gamesGetAll } = require("./api/routes/controllers/games.controllers.js");
require("./api/data/db.js");
app.set("port", 3000);
app.get("/", function (req, res) {
    console.log("Get received");
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});
//json request
app.use("/api", routes);

//application level middleware
app.use("/css", function (req, res, next) {
    console.log(req.method, req.url);
    next();
});
//order matters
app.use("/public", express.static(path.join(__dirname, "public")));

let server = app.listen(app.get("port"), function () {
    let port = server.address().port;
    console.log("Listening " + port);
});
