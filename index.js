const express = require('express');

const app = express();

const {connectToDb} = require('./connection');

const router = require('./router/user');    

const User = require('./model/user');

const PORT = 1000;

const url="mongodb://127.0.0.1:27017/url-shortner";

app.use(express.json());

app.set('view engine', 'ejs');

connectToDb(url).then(()=>{ console.log('connect to mongodb')}).catch((err)=>{
    console.log("There is an error in connection",err);
});

app.use(express.urlencoded({ extended: false }));

app.use('/url', router);

app.get('/myurl/:shortid', async(req, res)=>{
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

app.listen(PORT, ()=>{
    console.log(`App is listening on PORT ${PORT}`);
})