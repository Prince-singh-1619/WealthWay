const mongoose = require('mongoose')

const earningSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    type:{
        type:String,
        enum: ["Salary", "Freelance", "Business", "Investment", "Interest", "Gift", "Refund", "Rent", "Selling", "Bonus", "Others"],
        required: true,
    },
    amount:{
        type:Number,
        required: true,
    },
    date:{
        type:Date,
        default:Date.now
        // required: true,
    },
    status:{
        type:String,
        enum: ["Received", "Pending"],
        default: "Received"
        // required: true,
    },
    description: {
        type: String,
    }
}, { timestamps: true })

const earningModel = mongoose.model("Earning", earningSchema)
module.exports = earningModel