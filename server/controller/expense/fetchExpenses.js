const expenseModel = require("../../models/expenseModel")

async function fetchExpensesController(req, res){
    try {
        const userId = req.query.userId
        // console.log("userId from back", req.query.userId)
        if(!userId) throw new Error("UserId not received")

        const allExpenses = await expenseModel.find({userId: userId})

        res.json({
            message: "Expense data fetched successfully",
            data: allExpenses,
            success: true,
            error: false
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

module.exports = fetchExpensesController