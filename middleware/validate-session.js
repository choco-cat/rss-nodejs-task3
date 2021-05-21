const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
// allowing options as a method for request
        next();
    } else {
        const sessionToken = req.headers.authorization;
        console.log("sessionToken ", sessionToken);
        if (!sessionToken) {
            res.status(403).send({auth: false, message: "No token provided."});
        } else {
            jwt.verify(sessionToken, "lets_play_sum_games_man", (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                        req.user = user;
                        console.log(`user: ${user}`);
                        next();
                    },
                        () =>  res.status(401).send({ error: "not authorized" })
                    );

                } else {
                    res.status(400).send({ error: "not authorized" });
                }
            });
        }
    }
};
