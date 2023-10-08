const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    email: {type:String, required:true,unique:true},
    name:{type:String, required:true},
    password: {type:String, required:true}
},{
    versionKey:false
})

const UserModel = mongoose.model('user',userSchema)

module.exports = {
    UserModel
}