const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()


router.get("/",async(req,res) => { 

    const cookieToken = req.cookies.refreshToken

console.log("route reached")
try { 

    const verifyToken = jwt.verify(cookieToken,process.env.REFRESH_SECRET)



const newToken = jwt.sign({userId: verifyToken.userId},process.env.JWT_SECRET,{expiresIn: "15m"})


return res.status(201).json({token: newToken})

}catch(err) { 

    console.log("error: ",err)
    return res.status(500).json({message: "unable to send new token"})
}




})

module.exports = router