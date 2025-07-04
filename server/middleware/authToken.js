const jwt = require('jsonwebtoken')

async function authToken(req, res, next){
    try {
        // const token = req.cookies?.token
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Unauthorized. Please log in.",
                error: true,
                success: false,
            })
        }
        // if(!token){
        //     return res.status(200).json({
        //         message: "Please log in..",
        //         error: true,
        //         success: false
        //     })
        // }

        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded){
            console.log(err)
            console.log("decoded", decoded)

            if(err) {
                console.log("Error in authToken", err)
                return res.status(401).json({
                    message: "Invalid or expired token.",
                    error: true,
                    success: false,
                });
            }

            // req.userId = decoded?._id
            req.userId = decoded?.userId
            next()
        })
    } 
    catch (err) {
        res.status(500).json({
            message: err.message || err,
            // data: [],
            error: true,
            success: false
        })    
    }
}

module.exports = authToken