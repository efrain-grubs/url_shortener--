const express = require('express')
const {body,validationResult} = require('express-validator')



const validateFields = [body("username").notEmpty().withMessage("fill the empty fields").isLength({min: 4}).withMessage("password or username must be more than four characters"),
   
    body('password').notEmpty().withMessage("fill the empty fields").isLength({min: 4}).withMessage("password or username must be more than four characters"),
(req,res,next) => { 

const errors = validationResult(req)


if(!errors.isEmpty()) { 


    return res.status(400).json({errors: errors.array()})
}

next()



}
]


module.exports = validateFields