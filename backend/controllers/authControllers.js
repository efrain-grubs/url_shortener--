const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const register = async(req,res) => { 


const{name,username,password} = req.body

if(!name || !username || !password) { 

    return res.status(400).json({message: "fill empty fields"})
}

    try { 

const existingUser = await User.findOne({username})

if(existingUser) { 

    return res.status(400).json({message: "user already exist"})
}

const hashpassword = await bcrypt.hash(password,10)

const newUser = new User({name,username,password:hashpassword})

newUser.save()



return res.status(201).json({message: "new user created"})

    }catch(err) { 


        console.log("error: ",err)

        return res.status(500).json({message: "something went wrong"})
    }


}



const login = async(req,res) => { 

const{username,password} = req.body


if(!username || !password) { 
    return res.status(400).json({message: "fill empty fields"})
}

try {

const findUser = await User.findOne({username})

if(!findUser) { 

    return res.status(400).json({message: "invalid user"})
}

const verifyPassword = await bcrypt.compare(password,findUser.password)

if(!verifyPassword) { 

    return res.status(400).json({message: "invalid password"})
}


const token = jwt.sign({userId: findUser._id},process.env.JWT_SECRET,{expiresIn: '15m'})

const refreshToken = jwt.sign({userId: findUser._id},process.env.REFRESH_SECRET,{expiresIn: "7d"})



res.cookie('refreshToken',refreshToken,{

    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 604800000
})

req.userId = findUser._id

return res.status(200).json({message: "user logged in",token})


} catch(err) { 

    console.log("error: ",err)

    return res.status(500).json({message: "unable to login user"})
}

}

 module.exports = {register,login}
