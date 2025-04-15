const expenseModel = require("../../models/expenseModel")

async function editExpenseController(req, res){
    try {
        const {_id, title, type, amount, date, status, description, invoice} = req.body
        if(!_id) throw new Error("_Id not found")
        if(!title) throw new Error("Title required")
        if(!type) throw new Error("Type required")
        if(!amount) throw new Error("Amount required")
        if(!date) throw new Error("Date required")
        if(!status) throw new Error("Payment status required")

        const update = await expenseModel.findByIdAndUpdate(
            _id, 
            { title, type, amount, date, status, description, invoice }, 
            { new : true }
        )

        res.status(200).json({
            message: "Expense item updated successfully",
            data: update,
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

module.exports = editExpenseController