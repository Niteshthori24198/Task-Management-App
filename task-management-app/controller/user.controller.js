
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const { TodoModel } = require('../model/todo.model');
const { UserModel } = require("../model/user.model");
const { BlacklistModel } = require('../model/blacklist.model');
const { emailValidator, nameValidator, passwordValidator } = require('./validation');

const newUserRegister = async (req, res) => {

    let { email, name, password } = req.body;

    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!emailValidator(email)) {
        return res.status(400).send({ "error": "Email entered by user isn't in correct format. Kindly provide valid email address." });
    }
    if (!nameValidator(name)) {
        return res.status(400).send({ "error": "Name entered by user isn't in correct format. Kindly provide valid name" });
    }
    if (!passwordValidator(password)) {
        return res.status(400).send({ "error": "Password entered by user isn't in correct format. Kindly provide valid password. Password must contain atleast 6 characters [one uppercase, onelowercase, one special character and numeric]." });
    }

    if (await verifyUser(email)) {
        return res.status(201).send({ "error": "User Already Exists. Kindly Login to access the App." });
    }

    bcrypt.hash(password, 6, async (err, hash) => {

        try {

            const user = new UserModel({ email, name, password: hash })
            await user.save()
            return res.status(200).send({
                "msg": "New User has been Registered Successfully !",
                "User": user,
                "ok": true
            })
        } catch (error) {
            return res.status(400).send({ "error": error.message });
        }
    });
}


const userLogin = async (req, res) => {

    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();

    try {

        if (!emailValidator(email)) {
            return res.status(400).send({ "error": "Email entered by user isn't in correct format. Kindly provide valid email address." });
        }

        const user = await verifyUser(email);

        if (user) {

            bcrypt.compare(password, user.password, (err, result) => {

                if (err) {

                    return res.status(400).send({
                        "msg": "Invaid Password detected. Kindly provide correct password."
                    })

                } else {

                    return res.status(200).send({
                        "msg": "Login Successfull",
                        "token": jwt.sign({ userId: user._id }, process.env.SecretKey, { expiresIn: '24h' })
                    })
                }
            })
        } else {

            return res.status(400).send({
                "msg": "Kindly Register First to Access Service."
            })
        }
    } catch (error) {

        return res.status(400).send({
            "msg": error.message
        })
    }
}


const userProfileGet = async (req, res) => {

    const { userId } = req.body;

    try {

        const user = await UserModel.findById({ _id: userId });

        if (user) {
            return res.status(200).send({ ok: true, user: user });
        } else {
            return res.status(400).send({ "msg": "User Not Found." })
        }
    } catch (error) {

        return res.status(400).send(
            { "error": error.message }
        )
    }
}


const userProfileUpdate = async (req, res) => {

    const { userId } = req.body;

    if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password, 6);
    }

    try {

        const verifyUser = await UserModel.findById({ _id: userId });

        if (verifyUser) {

            await UserModel.findByIdAndUpdate({ _id: userId }, { ...req.body });
            const user = await UserModel.findOne({ _id: userId });
            return res.status(200).send({
                "msg": "User Data Has been Updated Successfully.",
                "user": user,
                "Success": true
            });

        } else {
            return res.status(400).send('User Not Found');
        }
    } catch (error) {

        return res.status(400).send({ "error": error.message });
    }
}


const userProfileDelete = async (req, res) => {

    const { userId } = req.body;

    try {

        const verifyUser = await UserModel.findById({ _id: userId });

        if (verifyUser) {

            await UserModel.findByIdAndDelete({ _id: userId });
            await TodoModel.deleteMany({ userId });

            return res.status(200).send({
                "msg": `${userId} user has been deleted successfully.`
            });
        } else {

            return res.status(400).send({
                "msg": "User doesn't exists"
            });
        }
    } catch (error) {

        return res.status(400).send({ "error": error.message })
    }
}


const userLogout = async (req, res) => {

    const authToken = req.headers['authorization'];

    if (!authToken) {
        return res.status(400).send({
            "msg": "Token Not Found.",
            "Success": false
        })
    }

    const token = authToken.trim().split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.SecretKey)
        const newBlacklistToken = new BlacklistModel({ token: token })

        await newBlacklistToken.save()

        return res.status(200).send({
            "Success": true,
            "msg": "Logout Successfull."
        })
    } catch (error) {

        return res.status(400).send({

            "error": error.message,
            "msg": "Something Wrong with the Token passed",
            "Success": false,
        })
    }
}


async function verifyUser(email) {

    try {

        const isUserPresent = await UserModel.findOne({ email });
        return isUserPresent;
    } catch (error) {
        return null
    }
}


module.exports = {
    newUserRegister,
    userLogin,
    userLogout,
    userProfileGet,
    userProfileUpdate,
    userProfileDelete,
}