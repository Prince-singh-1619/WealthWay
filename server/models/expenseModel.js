const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
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
        enum: ["Food & Essentials", "Transport", "Education", "Healthcare", "Entertainment", "Shopping", "Utilities", "Rent", "Housing", "Subscriptions", "Others"],
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
        enum: ["Completed", "Pending"],
        default: "Pending"
        // required: true,
    },
    description: {
        type: String,
    },
    invoice:{
        type:String,
        // required: true,
    },

}, { timestamps:true })

const expenseModel = mongoose.model("Expense", expenseSchema)
module.exports = expenseModel