const {getValue} = require('../service/auth');

async function restrictToLoggedinUserOnly(req, res, next){
    const userUid = req.cookies?.uid;
    if(userUid===null) return res.render('login');
    const user = getValue(userUid);
    if(user==null) return res.render('login');
    req.user = user;
    next();
}

module.exports = {restrictToLoggedinUserOnly};