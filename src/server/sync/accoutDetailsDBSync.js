const {createAccountDetailsTable}=require("../models/AccountDetails");
const {createNewAccount}=require("../models/AccountDetails");

createAccountDetailsTable({force:false})
    .then(()=>createNewAccount())
    .catch(()=>console.log("an error occured"));