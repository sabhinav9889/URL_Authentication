const express = require('express');

const router = express.Router();

const {handleGenerateNewShortURL} = require('../controller/user');

const User = require('../model/user');

const url = 'mongodb://127.0.0.1:27017/url-shortner';

const dbName = 'url-shortner';

const { default: mongoose } = require('mongoose');

const {handleGetAnalytics} = require('../controller/user');

router.post('/', handleGenerateNewShortURL);

console.log(User);

router.get('/:shortid', async(req, res)=>{
    const shortId = req.params.shortid;
    const resul = await User.findOneAndUpdate({shortId:shortId},{ $push:{
        visitHistory: {
            timestamp: Date.now(),
        },
      }, 
    });
    if(resul===null) return res.send("Please enter valid Short-URL");
    return res.redirect(resul.redirectURL);
});

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;