const jwt = require('jsonwebtoken')
const express = require('express')
require('dotenv').config()

const verifyToken = async(req,res,next) => { 

const authHeader = req.headers.authorization

if(!authHeader || !authHeader.startsWith("Bearer ")) {

    return res.status(401).json({message: "invalid token"})
}

const token = authHeader.split(" ")[1]


try { 

const verify = jwt.verify(token,process.env.JWT_SECRET)

if(!verify) {

    return res.status(401).json({message: "invalid token"})
}

req.userId = verify.userId

next()

}catch(err) { 

    console.log("error: ",err)

    return res.status(401).json({message: "invalid token"})
}


}

module.exports = verifyToken