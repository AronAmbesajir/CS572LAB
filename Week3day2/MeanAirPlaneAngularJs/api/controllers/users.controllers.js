const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");



module.exports.usersGetAll = function (req, res) {
    const defaultOffset = 0;
    const defaultCount = 10;
    let offset = defaultOffset;
    let count = defaultCount;
    const maxCount = 10;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    User.find().skip(offset).limit(count).exec(function (err, users) {
        console.log("Found games", users.length);
        res.status(200).json(users);
    });
}

module.exports.register = function (req, res) {
    console.log("Registering user");
    const username = req.body.username;
    const name = req.body.name || null;
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const newUser = {
        username: username,
        name: name,
        password: password
    };
    User.create(newUser, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        else {
            console.log("user created", user);
            res.status(200).json(user);
        }
    });
};

//log in
module.exports.login = function (req, res) {
    console.log("Logging in user");
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username: username }).exec(function (err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } if (user) {
            console.log("user found ",user.password);
            if (bcrypt.compareSync(password, user.password)) {
                console.log("user found", user);
                let token = jwt.sign({ name: user.username }, "cs572", { expiresIn: 3600 });
                res.status(200).json({ success: true, token: token });
            } else { res.status(401).json("Unauthorized"); }
        } else {
            console.log("user not found", user);
            res.status(400).json("Unauthorized");
        }
    });
};

module.exports.authenticate = function (req, res, next) {
    let headerExists = req.headers.authorization;
    console.log( "header ", req.headers);
    if (headerExists) {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "cs572", function (err, decoded) {
            if (err) {
                console.log(err);
                res.status(401).json("Unauthorized");
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else { res.status(403).json("No token provided"); }
};



module.exports.usersDeleteOne = function (req, res) {
    const userId = req.params.userId;
    console.log("DELETE userId ", userId);
    User.findByIdAndDelete(userId).exec(function (err, deletedUser) {
        const response = {
            status: 204,
            message: deletedUser
        };
        if (err) {
            console.log("Error finding user");
            response.status = 500;
            response.message = err;
        } else if (!deletedUser) {
            response.status = 404;
            response.message = { "message": "User ID not found" };
        }
        res.status(response.status).json(response.message);
    });
};