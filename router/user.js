const express = require('express');

const router = express.Router();

const {handleGenerateNewShortURL} = require('../controller/user');

const User = require('../model/user');

const url = 'mongodb://127.0.0.1:27017/url-shortner';

const dbName = 'url-shortner';

const { default: mongoose } = require('mongoose');

const {handleGetAnalytics} = require('../controller/user');

router.post('/', handleGenerateNewShortURL);

router.get('/', async (req, res)=>{
    const id = await User.find({});
    return res.render('home',{id:id});
});


router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;