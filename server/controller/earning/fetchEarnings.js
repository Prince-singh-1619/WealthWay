const earningModel = require("../../models/earningModel")

async function fetchEarningsController(req, res){
    try {
        const userId = req.query.userId
        // console.log("userId from back", req.query.userId)
        if(!userId) throw new Error("UserId not received")

        const allEarnings = await earningModel.find({userId: userId})

        res.json({
            message: "Earning data fetched successfully",
            data: allEarnings,
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

module.exports = fetchEarningsController