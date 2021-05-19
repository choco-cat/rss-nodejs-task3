const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const DataTypes = require('sequelize');
const modelUser = require('../models/user');
const User = modelUser(sequelize, DataTypes);

module.exports = function (req, res, next) {
    if (req.method == 'OPTIONS') {
// allowing options as a method for request
        next();
    } else {
        const sessionToken = req.headers.authorization;
        console.log('sessionToken ', sessionToken);
        if (!sessionToken) {
            res.status(403).send({auth: false, message: "No token provided."});
        } else {
            jwt.verify(sessionToken, 'lets_play_sum_games_man', (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                        req.user = user;
                        console.log(`user: ${user}`);
                        next();
                    },
                        function () {
                            res.status(401).send({ error: "not authorized" });
                        })

                } else {
                    res.status(400).send({ error: "not authorized" });
                }
            });
        }
    }
}
