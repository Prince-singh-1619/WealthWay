const mongoose = require('mongoose')

const supportSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    // date: {
    //     type: Date,
    //     default: Date.now,
    // },
}, { timestamps:true })

const supportModel = mongoose.model("Support", supportSchema)
module.exports = supportModel