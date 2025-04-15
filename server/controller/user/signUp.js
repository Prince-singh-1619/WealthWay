const userModel = require('../../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function signUpController(req, res) {
    try {
        const {profilePic, firstName, lastName, email, password} = req.body

        const user = await userModel.findOne({email})
        if(user) throw new Error("User already exists with same email")
        
        if(!firstName) throw new Error("Please provide first name")
        if(!lastName) throw new Error("Please provide last name")
        if(!email) throw new Error("Please provide email")
        if(!password) throw new Error("Please provide password")

        //hashing password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        if(!hashedPassword) throw new Error("Something went wrong in hashed password")

        const payload = {
            ...req.body,
            password: hashedPassword
        }

        const newUser = new userModel(payload)
        const saveUser = await newUser.save()

        const tokenData = { userId: saveUser._id }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60*60*24*7})
        const tokenOption = {
            httpOnly: true, 
            secure: true,
            sameSite: "None",
            maxAge:7*24*60*60*1000
        }
        res.cookie("token", token, tokenOption)

        const { password: _, ...userWithoutPassword} = saveUser.toObject();

        res.status(201).json({
            message: "User created successfully",
            data: token, 
            user : {
                userId: userWithoutPassword._id,
                firstName: userWithoutPassword.firstName,
                lastName: userWithoutPassword.lastName,
                email: userWithoutPassword.email,
                userTag: userWithoutPassword.userTag,
                profilePic: userWithoutPassword.profilePic,
            },
            success: true, 
            error: false,
        })
    } 
    catch (err) {
        res.json({
            error: true,
            success: false,
            message: err.message || err,
        })    
    }
}

module.exports = signUpController