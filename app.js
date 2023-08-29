const express=require("express");
require("dotenv").config();

const connectToDb = require("./config/db.js")
const router = require("./Router/userrouter.js")

const app=express();
const cookieParser=require('cookie-parser')
const cors=require("cors")

connectToDb();

app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use('/api/auth/',router);
app.use('/',(req,res)=>{
    res.status(200).json({data :'login and signup page'})
})
module.exports=app;