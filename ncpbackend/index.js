const express=require('express');
const cors=require('cors');
const api_config = require('./config');

const app=express();
const port =api_config.port;
app.use(express.json());

app.use(cors({origin:['http://localhost:3000']}));
app.use(express.json());

const userRouter=require('./routes/userRouter');
const platformRouter=require('./routes/platformRouter');
const reviewRouter=require('./routes/reviewRouter');
const utilRouter=require('./routes/util');
const contactusRouter=require('./routes/contactusRouter');




app.use('/user' , userRouter);
app.use('/platform',platformRouter);
app.use('/reviewrating',reviewRouter);
app.use('/util',utilRouter);
app.use('/contactus',contactusRouter);

app.use(express.static('./static/uploads'));

app.listen(port,()=>{
    console.log("express Started");
})