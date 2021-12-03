const express = require('express');
const User    = require('../models/User');

module.exports = async function(req , res , next){
    const {username , password} = req.body;
    if(!username || !password) return res.status(400).json({error : {msg : "All input fields are required"}});
    try{
        const foundUser = await User.findOne({username : username});
        if(foundUser) return res.status(400).json({error : {msg : "User already exists"}});
        next();
    }catch(err){
        next(err)
    }
}