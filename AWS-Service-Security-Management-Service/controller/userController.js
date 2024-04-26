const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = require('../models/User');

registerUser = async (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
        let user = new userSchema({
            name: req.body.name,
            userName: req.body.userName,
            password: hash
        });
        user
            .save()
            .then((response) => {
                res.status(201).json({
                    message: 'User successfully created!',
                    result: response,
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error: error,
                })
            })
    })
}


logIn = (req, res, next) => {
    let getUser;
    userSchema
        .findOne({
            userName: req.body.userName,
        })
        .then((user) => {
            if (!user) {
                return res.status(201).json({
                    error: 'Authentication failed',
                })
            }
            getUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then((response) => {
            if (!response) {
                return res.status(201).json({
                    error: 'Authentication failed',
                })
            }
            let jwtToken = jwt.sign(
                {
                    userName: getUser.userName,
                    userId: getUser._id,
                },
                'Jai Shree Ram - This app will not work without shree ram blessing',
                {
                    expiresIn: '1h',
                },
            )
            res.status(200).json({
                token: jwtToken,
                expiresIn: 3600,
                _id: getUser._id,
            })
        })
        .catch((err) => {
            console.log("Error in authentication");
            // res.status(201).json({
            //     error: 'login failed',
            // })
        })
}

module.exports = {
    registerUser,
    logIn
}