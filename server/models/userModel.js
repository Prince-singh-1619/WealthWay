const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
    },
    lastName: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    userTag :{
        type: String,
        default: "Smart spender",
    },
    password: {
        type: String, 
        required: true,
    },
    profilePic: {
        type: String,
    },
    
    resetPasswordToken: String,
    resetPasswordExpires: String
}, {timestamps: true})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel