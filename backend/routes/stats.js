const express = require('express')
const router = express.Router()
const URL = require('../models/url')
const verifyToken = require('../middleware/protectRoutes')



router.get('/:id',verifyToken,async(req,res) => { 

const {id} = req.params

const findURL = await URL.findOne({_id: id})

if(!findURL) { 

    return res.status(400).json({message: "url doesnt exist "})
}


return res.status(200).json({message: "url info",findURL })





})





module.exports = router