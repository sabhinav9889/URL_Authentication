const mongoose = require('mongoose');

const User = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type: String,
        required: true,
    },
    visitHistory:[
        {timestamp: {type: Number }}
    ],
},{timestamp: true});

const connection = mongoose.model("url", User);

module.exports = connection;