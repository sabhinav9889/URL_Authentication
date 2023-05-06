const  shortid  = require('shortid');
const User = require('../model/user');
async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});
    const shortId = shortid.generate();
    const result = await User.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });
    console.log(result);
    return res.json({ id: shortId});
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await User.find({shortId:shortId});
    return res.json({ TotalNumberOfVisits: result[0].visitHistory.length,
        analytics: result[0].visitHistory,
    })
}
module.exports = {handleGenerateNewShortURL, handleGetAnalytics};