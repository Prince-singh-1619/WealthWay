const dotenv = require('dotenv')
dotenv.config()     //load env variables

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/db')

const cookieParser = require('cookie-parser')
const router = require('./routes/routes')

const app = express()
const PORT = process.env.PORT || 8080

connectDB()

const allowedOrigins = ['https://wealthway-hazel.vercel.app'];
//middleware
app.use(cors(
    {
        // origin: process.env.FRONTEND_URL,
        origin: allowedOrigins,
        credentials: true,
        methods: ["POST", "GET", "PUT", "DELETE"],
    }
))
app.use(express.json({ limit:'2mb' }))
app.use(cookieParser())

//DB Connection
mongoose.connect(process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        tlsAllowInvalidCertificates: false
    }
)
    .then(()=> console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error: ", err))

app.use("/api", router)

//start server
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})