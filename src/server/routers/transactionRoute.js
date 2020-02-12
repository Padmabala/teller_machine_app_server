const express=require('express');
const {withDraw,deposit,changePIN,getBalance,authenticateUser}=require("../models/AccountDetails");
const transactionRoute=express.Router();


transactionRoute.route('/login')
.post((req,res)=>{
    console.log(req.body," is the request body");
    const {custId,pin}=req.body;
    authenticateUser(custId,pin)
        .then((custID)=>{
            console.log("Cust Id is",custID);
            console.log(req.cookies);
            res.cookie('custId',custID,{httpOnly:true});
            const {customerId}=req.cookies;
            console.log("5555",customerId);
            res.status(200).send();
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send();
        })
})

transactionRoute.route('/withdraw')
.post((req,res)=>{
    const {custId=""}=req.cookies;
    
    console.log("Cookies is******************* ",custId)
    if(custId===""){
    const {amount}=req.body;
    withDraw(amount)
        .then((result)=>{
            res.status(200).send();
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send();
        })
    }
    else{
        res.status(403).send();
    }
})
transactionRoute.route('/deposit')
.post((req,res)=>{
    const {custId=""}=req.cookies;
    
    console.log("Cookies is******************* ",custId)
    if(custId===""){
    const {amount}=req.body;
    console.log("Amount is ",amount);
    deposit(amount)
        .then((result)=>{
            res.status(200).send();
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send();
        })
    }
    else{
        res.status(403).send();
    }
})
transactionRoute.route('/changePIN')
.post((req,res)=>{
    
    const {custId=""}=req.cookies;
    
    console.log("Cookies is******************* ",custId)
    if(custId===""){
    const {amount}=req.body;
    console.log("ChangePIN",req.body);
    const {oldPin,newPin}=req.body;
    
    changePIN(oldPin,newPin)
        .then((result)=>{
            res.status(200).send();
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send();
        })
    }
    else{
        res.status(403).send();
    }
})
transactionRoute.route('/balance')
.get((req,res)=>{
    
    const {custId=""}=req.cookies;
    
    if(custId===""){
    getBalance()
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((error)=>{
            console.log(error);
            res.status(403).send;
        })
    }
    else{
        res.status(403).send();
    }
})

transactionRoute.route('/logout')
.get((req,res)=>{
    const {custId=""}=req.cookies;
    console.log("Cookie stays",req.cookies.custId);
    res.clearCookie('custId');
    
    console.log("Cookie is cleared",req.cookies.custId);

})

module.exports=transactionRoute;