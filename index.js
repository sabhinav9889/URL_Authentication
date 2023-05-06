const express = require('express');

const app = express();

const {connectToDb} = require('./connection');

const router = require('./router/user');    

const PORT = 1000;

const url="mongodb://127.0.0.1:27017/url-shortner";

app.use(express.json());

connectToDb(url).then(()=>{ console.log('connect to mongodb')}).catch((err)=>{
    console.log("There is an error in connection",err);
});

app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(PORT, ()=>{
    console.log(`App is listening on PORT ${PORT}`);
})