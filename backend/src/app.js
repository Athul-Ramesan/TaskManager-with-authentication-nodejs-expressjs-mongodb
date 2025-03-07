const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
require("dotenv").config()


///////////////////////validation is to be done


const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(cors())

connectDB()

//////routes


app.listen(port, ()=>{
    console.log("App is connected and running on 3000")
})