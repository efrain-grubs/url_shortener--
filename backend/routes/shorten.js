const express = require('express')
const router = express.Router()
const URL = require('../models/url')
const {nanoid} = require('nanoid')
const verifyToken = require("../middleware/protectRoutes")
const axios = require('axios')

router.post('/public',async(req,res) =>{ 

const {url} = req.body

const shortId = nanoid(8)
if(!url) { 
    return res.status(400).json({message: "no url provided"})
}

const saveUrl = new URL({url,shortURL: shortId})


await saveUrl.save()


res.status(201).json({message: "shorten url created",shortURL: `http://localhost:5050/${shortId}`,urlID: shortId})



})

router.post('/private',verifyToken,async(req,res) =>{ 

    const {url} = req.body
    const userId = req.userId
    
    const shortId = nanoid(8)
    if(!url) { 
        return res.status(400).json({message: "no url provided"})
    }
    
    const saveUrl = new URL({url,shortURL: shortId,user: userId})
    
    
    await saveUrl.save()
    
    
    res.status(201).json({message: "shorten url created",shortURL: `http://localhost:5050/${shortId}`,urlID: shortId})
    
    
    
    })


router.post('/custom',verifyToken,async(req,res) => { 


const {url,customURL} = req.body
const userId = req.userId
if(!URL && !customURL) { 

    return res.status(400).json({message: "fill in the blank fields"})
}


const saveCustom = new URL({url: url,shortURL: customURL,user: userId})


await saveCustom.save()

res.status(201).json({message: "url created",saveCustom,short_url: `http://localhost:5050/${customURL}`})

})


router.get('/:id',async(req,res) => { 


const shortenLink = req.params.id

console.log("id: ",shortenLink)


try { 

    const rawIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ip = rawIP?.split(',')[0]?.replace('::ffff:', '') || '127.0.0.1';
    //const ip = "8.8.8.8"; mock ip address

    
const userAgent = req.get('User-Agent')

const location = await axios.get(`http://ip-api.com/json/${ip}`)



console.log("location", location.data);


const findShortenLink = await URL.findOne({shortURL: shortenLink})

if(!findShortenLink) { 

    return res.status(400).json({message: "URL not found"})
}

findShortenLink.clicksInfo.push({ip,userAgent,country: location.data?.country, regionName: location.data?.regionName, city: location.data?.city,timestamp: new Date() })



findShortenLink.clicks += 1;

await findShortenLink.save()

res.redirect(findShortenLink.url)

}catch(err) {

    console.log("error: ",err)

    return res.status(500).json({message: "something went wrong"})
}




})


router.get('/',verifyToken,async(req,res) => { 


const userId = req.userId

try { 

    const findUser = await URL.find({user: userId})

    if(findUser.length === 0) { 

        return res.status(400).json({message: "no urls found"})
    }


    return res.status(200).json({message: "urls found",findUser})
    
}catch(err) { 

    console.log("error: ",err)

    return res.status(500).json({message: "unable to fetch info"})
}


})


router.delete('/:id',verifyToken,async(req,res) => { 

    const itemTodelete = req.params.id

   

try { 


const removeItem = await URL.findByIdAndDelete(itemTodelete)

if(!removeItem) { 

    return res.status(404).json({message: "item not found"})
}



return res.status(201).json({message: "deletion successful"})

}catch(err) { 


    console.log("error: ",err)

    return res.status(500).json({message: "unable to delete"})
}




})





module.exports = router;