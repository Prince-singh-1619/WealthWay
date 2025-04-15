const expenseModel = require("../../models/expenseModel")

async function newExpenseController(req, res){
    try {
        const {userId, title, type, amount, date, status, description, invoice} = req.body
        if(!title) throw new Error("Title required")
        if(!type) throw new Error("Type required")
        if(!amount) throw new Error("Amount required")
        if(!date) throw new Error("Date required")
        if(!status) throw new Error("Payment status required")
        if(!userId) throw new Error("UserId not found")
        
        const payload = req.body

        const newExpense = new expenseModel(payload)
        const stored = await newExpense.save()

        res.status(200).json({
            message: "New expense saved successfully",
            data: stored,
            success: true,
            error: false
        })
    } 
    catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })    
    }
}

module.exports = newExpenseController