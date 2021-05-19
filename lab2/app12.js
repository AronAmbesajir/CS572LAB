
const express = require("express");
const app=express();
const path=require("path");
app.set("port",5000);
app.use("/public", express.static(path.join(__dirname,"public")));
app.get("/",function(req,res){
    console.log("Get received");
    res.status(200).sendFile(path.join(__dirname,"public","index.html"));
});

//application level middleware
app.use(function(req,res,next){
console.log(req.method,req.url);
next();
});

const express = require("express");
const app=express();
const path=require("path");
app.set("port",5000);
app.use("/public", express.static(path.join(__dirname,"public")));
app.get("/",function(req,res){
    console.log("Get received");
    res.status(200).sendFile(path.join(__dirname,"public","index.html"));
});

const server=app.listen(app.get("port"),function(){
   const port = server.address().port;
   console.log("Listening "+port);
});