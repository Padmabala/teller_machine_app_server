require('dotenv').config();
const cors=require('cors');
const transactionRouter=require("./routers/transactionRoute");
const express=require('express');
const bodyParser=require("body-parser");

const session=require('express-session');

const app=express();

app.use(cors());
app.use(bodyParser.json())

app.use(session({resave:true,saveUninitialized:true,secret:'shhh',cookie:{maxAge:60000}}))

app.use('/account',transactionRouter);

const server=app.listen(process.env.PORT,()=>{
                        console.log("Server Running at: ", server.address().port);
                        })