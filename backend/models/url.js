const mongoose = require("mongoose")


const URLSchema = mongoose.Schema({ 

url: { 
    required: true,
    type: String
},
clicks: { 

    type: Number,
    default: 0
}, 
shortURL: { 

    type: String,
    unique: true,
    required: true

},

user: { 
    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
clicksInfo: [

    {
    
        ip: String,
        userAgent: String,
        timestamp: {type: Date, default: Date.now},
        country: String,
        regionName: String,
        city: String
    }
    
    
        ]



},{timestamps: true})


URLSchema.index({"clicksInfo.timestamp": 1})




module.exports = mongoose.model("URL",URLSchema)