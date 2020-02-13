const express=require('express');
const {withDraw,deposit,changePIN,getBalance,authenticateUser,createNewAccount}=require("../models/AccountDetails");
const transactionRoute=express.Router();

let sess="";
transactionRoute.route('/login')
.post((req,res)=>{
    const {custId,pin}=req.body;
    authenticateUser(custId,pin)
        .then((userId)=>{
            sess=req.session;
            sess.custId=userId;
            res.status(200).send('ok');
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send();
        })
})
transactionRoute.route('/newUser')
.post((req,res)=>{
    const {custId,pin}=req.body;
    createNewAccount(custId,pin)
        .then((result)=>{
            res.status(200).send();
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send();
        })
})

transactionRoute.route('/withdraw')
.post((req,res)=>{
    if(sess!==undefined){
    const {amount}=req.body;
    withDraw(amount,sess.custId)
        .then((result)=>{
            res.status(200).send();
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send();
        })
    }
    else{
        res.status(440).send();
    }
})
transactionRoute.route('/deposit')
.post((req,res)=>{
    if(sess!==undefined){
    const {amount}=req.body;
    deposit(amount,sess.custId)
        .then((result)=>{
            res.status(200).send();
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send();
        })
    }
    else{
        res.status(440).send();
    }
})
transactionRoute.route('/changePIN')
.post((req,res)=>{
    
    if(sess!==undefined){
    const {amount}=req.body;
    const {oldPin,newPin}=req.body;
    
    changePIN(oldPin,newPin,sess.custId)
        .then((result)=>{
            res.status(200).send();
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send();
        })
    }
    else{
        res.status(440).send();
    }
})
transactionRoute.route('/balance')
.get((req,res)=>{    
     
    if(sess!==undefined){
    getBalance(sess.custId)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send;
        })
    }
    else{
        res.status(440).send();
    }
})

transactionRoute.route('/logout')
.get((req,res)=>{
    
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.status(200).send();
            sess=req.session
        }
    })
})

module.exports=transactionRoute;