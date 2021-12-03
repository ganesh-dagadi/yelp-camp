const express = require('express');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken')

module.exports.authenticateUser = async(req , res , next)=>{
    const accessToken = req.headers.access_token;
    if(!accessToken){
        return res.status(302).json({error : "No accessToken provided"})
    } 
    try{
        const tokenData = jwt.verify(accessToken , process.env.JWT_ACCESS_SECRET);
        try{
            const user = await User.findOne({_id : tokenData._id});
            if(!user) return res.status(404).json({error : {msg : "Resource not found"}});
            req.user = user;
            next()
        }catch(err){
            next()
        }
    }catch(err){
        res.status(401).json({error : {msg : "Invalid Token"}})
    }
}



