const expenseModel = require('../../models/expenseModel')

async function uploadMergedExpensesController(req, res){
    const data = req.body
    
    if(!Array.isArray(data) || data.length===0){
        return res.status(400).json({
            message: "Invalid data format. Expected an array.", 
            success: false,
        })
    }
    
    try {
        const inserted = await expenseModel.insertMany(data)

        res.status(200).json({
            message: `${inserted.length} entries uploaded successfully`,
            data: inserted,
            success: true,
            error: false,
        })
    } 
    catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
} 

module.exports = uploadMergedExpensesController