const rateLimit = require('express-rate-limit')


const limiter = rateLimit({

windowMs: 1 * 60 * 1000,
max: 10,
message: {message: "Too many request, please try again later."}



})


module.exports = limiter