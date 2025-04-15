const earningModel = require("../../models/earningModel")

async function newEarningController(req, res){
    try {
        const {userId, title, type, amount, date, status, description} = req.body
        if(!userId) throw new Error("UserId not found")
        if(!title) throw new Error("Title required")
        if(!type) throw new Error("Type required")
        if(!amount) throw new Error("Amount required")
        // if(!date) throw new Error("Date required")
        // if(!status) throw new Error("Payment status required")

        const payload = req.body

        const newEarning = new earningModel(payload)
        const stored = await newEarning.save()

        res.status(200).json({
            message: "New earning saved successfully",
            data: stored,
            success: true,
            error: false,
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = newEarningController