const { Router } = require('express');
const userRouter = Router();

const { auth } = require('../middleware/auth.middleware');

const {
    newUserRegister,
    userLogin,
    userLogout,
    userProfileGet,
    userProfileUpdate,
    userProfileDelete,
} = require('../controller/user.controller')


// Unprotected Routes

userRouter.post("/register", newUserRegister)
userRouter.post("/login", userLogin)
userRouter.post("/logout", auth, userLogout)


// Protected Routes Accessible only after login

userRouter.get('/get', auth, userProfileGet)
userRouter.patch('/update', auth, userProfileUpdate)
userRouter.delete('/delete', auth, userProfileDelete)


module.exports = {
    userRouter
}