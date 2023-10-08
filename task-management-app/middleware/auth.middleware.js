require('dotenv').config();
const jwt = require('jsonwebtoken');

const { BlacklistModel } = require('../model/blacklist.model')

const auth = async (req, res, next) => {

    if (!req.headers['authorization']) {

        return res.status(400).send({
            "msg": "Token Not Found !",
            "result": null
        })
    }

    const token = req.headers['authorization'].split(' ')[1];

    if (token) {

        try {

            const isTokenBlacklisted = await BlacklistModel.findOne({ token: token })

            if (isTokenBlacklisted) {
                return res.status(400).send({
                    "error": "Provided Token is BlackListed ! Kindly Provide a valid token to gain access !"
                })
            }

            const decoded = jwt.verify(token, process.env.SecretKey);

            if (decoded) {
                req.body.userId = decoded.userId;
                next();
            } else {
                return res.status(400).send({
                    "msg": "Kindly Login First to Access Protected Route !"
                })
            }

        } catch (error) {

            return res.status(400).send({
                "msg": "Invalid Token detected or JWT might be Expired !"
            })
        }
    } else {

        return res.status(400).send({
            "msg": "Kindly Login First to Access Protected Route !"
        })
    }
}


module.exports = {auth}