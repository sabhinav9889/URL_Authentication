const express = require('express');

const router = express.Router();

const {requestHandlerLogin, requestHandlerSignup }= require('../controller/authentication');

router.get('/', (req, res)=>{
    res.render('signup');
})

router.post('/login', requestHandlerLogin);

router.post('/signup', requestHandlerSignup);

module.exports = router;