const userModel = require("../../models/userModel")

async function updateProfileController(req, res){
    try {
        console.log("inside updateProfileController")
        console.log(req.body);
        
        const {userId, profilePic, firstName, lastName, email, userTag} = req.body
        if(!userId) throw new Error("UserId not received")
        // if(!firstName) throw new Error("Please provide first name")
        // if(!lastName) throw new Error("Please provide last name")
        // if(!email) throw new Error("Please provide email")

        const updatedUser = await userModel.findByIdAndUpdate(
            userId, 
            { firstName, lastName, email, userTag, profilePic},
            { new: true}
        );

        res.json({
            data: {
                userId: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                userTag: updatedUser.userTag,
                profilePic: updatedUser.profilePic,
            },
            message: "User updated successfully",
            success: true,
            error: false,
        })
    } 
    catch (error) {
        res.json({
            message: error.message || error,
            error: true, 
            success: false,
        })    
    }
}

module.exports = updateProfileController