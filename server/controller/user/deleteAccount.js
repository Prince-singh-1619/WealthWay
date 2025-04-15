const bcrypt = require('bcryptjs')
const earningModel = require("../../models/earningModel")
const expenseModel = require("../../models/expenseModel")
const userModel = require("../../models/userModel")

async function deleteAccountController(req, res){
    try {
        const {password, userId} = req.query
        if(!password) throw new Error("Password not received")
        if(!userId) throw new Error("UserId not received")

        const findUser = await userModel.findOne({_id: userId})
        if(!findUser) throw new Error("User not found")

        const comparePassword = await bcrypt.compare(password, findUser.password)
        if(!comparePassword) throw new Error("Incorrect password")
        
        // const userId = req.query

        const deleteEarnings = await earningModel.deleteMany({userId : userId})
        if(!deleteEarnings){
            res.status(404).json({
                message: "Earning data not deleted entirely",
                success: false, 
                error: true,
            })
        }
        const deleteExpenses = await expenseModel.deleteMany({userId: userId})
        if(!deleteExpenses){
            res.status(404).json({
                message: "Expenses data not deleted entirely",
                success: false, 
                error: true,
            })
        }
        const deleteUser = await userModel.findByIdAndDelete(userId)
        if(!deleteUser){
            res.status(404).json({
                message: "User not deleted",
                success: false, 
                error: true,
            })
        }

        res.status(200).json({
            message: "User deleted Successfully",
            error: false,
            success: true
        })
  
    } catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

module.exports = deleteAccountController