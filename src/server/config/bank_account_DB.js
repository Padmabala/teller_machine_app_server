require('dotenv').config();
const Sequelize=require('sequelize');
const bankAccountDB=new Sequelize(process.env.DB_URI);

bankAccountDB
.authenticate()
.then(()=>{
    console.log("DB Connection established");
})
.catch(()=>{
    console.log("Failed to establish DB connection");
})

module.exports=bankAccountDB;