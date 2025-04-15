const expenseModel = require("../../models/expenseModel")

async function deleteExpenseController(req, res){
    const dataId = req.query.dataId
    if(!dataId) throw new Error("data Id not received")
    
    try {
        const deleted = await expenseModel.findByIdAndDelete(dataId)

        if(!deleted){
            res.status(404).json({
                message: "Expense entry not found",
                success: false, 
                error: true,
            })
        }

        res.status(200).json({
            message: "Expense entry deleted successfully",
            data: deleted,
            success: true, 
            error: false
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}

module.exports = deleteExpenseController