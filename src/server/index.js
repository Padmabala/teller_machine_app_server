require('dotenv').config();
const cors=require('cors');
const transactionRouter=require("./routers/transactionRoute");
const express=require('express');
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");

const app=express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json())

app.get('/',((req,res)=>{
    res.send("Hey Everybody");
}));

app.use('/account',transactionRouter);


const server=app.listen(process.env.PORT,()=>{
                        console.log("Server Running at: ", server.address().port);
                        })