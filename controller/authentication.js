const User = require('../model/authentication');
const alert = require('alert');
const { v4: uuidv4 } = require('uuid');
const {setValue, getValue} = require('../service/auth');

async function requestHandlerSignup(req, res){
    const {username, email, password} = req.body;
    await User.create({
        username,
        email,
        password,
    });
    return res.render('login');
}

async function requestHandlerLogin(req, res){
    const {username,password} = req.body;
    const result = await User.findOne({username: username, password: password});
    if(result===null){ 
        alert("Enter right username and password");    
        return res.render('login');
    }
    const sessionId = uuidv4();
    setValue(sessionId, result);
    res.cookie('uid', sessionId);
    return res.redirect('/url');
}
module.exports ={ requestHandlerLogin, requestHandlerSignup};