const express = require('express')
const router = express.Router()
const {register,login} = require("../controllers/authControllers")
const validation = require("../middleware/validateUser")


router.post('/register',validation,register)
router.post('/login',login)

module.exports = router