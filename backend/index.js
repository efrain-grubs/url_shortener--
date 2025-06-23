const express = require('express')
const cors = require('cors')
const cookie = require('cookie-parser')
const mongoose = require("mongoose")
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors({
credentials: true,
origin: "http://localhost:3000"

}))
app.use(cookie())

//imports here
const userInfo = require('./routes/authRoutes')
const refresh = require("./routes/refresh")
const url = require("./routes/shorten")
const stats = require('./routes/stats')
const limiter = require('./middleware/limiter')

app.use('/user',limiter,userInfo)
app.use('/refresh',refresh)
app.use('/',url)
app.use('/stats',stats)


mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(5050,() => console.log("connected to port")))
.catch((err) => console.log("unable to connect to mongoDB",err))



