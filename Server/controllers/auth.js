const express = require('express');
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const jwt     = require('jsonwebtoken');

module.exports.registerUser = async(req , res ,next)=>{
    const userData = req.body;
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password , salt);
    try{
        const newUser = await User.create(userData);
        res.status(200).json({user : newUser , msg : "Registered successfully. Please Login" })
    }catch(err){
        next(err)
    }
}

module.exports.loginUser = async(req , res , next)=>{
    const {username , password} = req.body;
    try{
        const user = await User.findOne({username : username})
        if(!user) return res.status(400).json({error :{msg : "User does not exist"}})
        if(!(await bcrypt.compare(password , user.password))) return res.status(400).json({error : {msg : "Passwords dont match"}})
        
        const accessToken = jwt.sign(
            {
                _id      : user._id
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn : 1200
            }
        )
        
        const refreshToken = jwt.sign(
            {
                _id      : user._id
            },
            process.env.JWT_REFRESH_SECRET,
        )

        await RefreshToken.create({
            token : refreshToken
        })

        res.status(200).json({user : user , auth : {accessToken : accessToken , refreshToken : refreshToken}})
    }catch(err){
        next(err)
    }
}

module.exports.newToken = async(req, res , next)=>{
    const refreshToken = req.headers.refresh_token;
    if(!refreshToken) return res.status(403).json({error : {msg : "No refresh token"} , isrefTokenError : true});
    try{
       const dbToken =  await RefreshToken.findOne({token : refreshToken});
       if(!dbToken) return res.status(403).json({error : {msg : "refresh token invalid"} , isrefTokenError : true});
       try{
            const tokenData = await jwt.verify(refreshToken , process.env.JWT_REFRESH_SECRET);
            const accessToken = jwt.sign(
                {_id : tokenData._id},
                process.env.JWT_ACCESS_SECRET,
                {expiresIn : 60})

            res.status(200).json({auth : {accessToken : accessToken}})
       }catch(err){
            // the refreshToken is invalid/expired
            res.status(403).json({error : {msg : "refresh token invalid"} , isrefTokenError : true});
       }
    }catch(err){
        next()
    }
}

module.exports.logoutUser = async(req , res , next)=>{
    const refreshToken = req.headers.refresh_token;
    if(!refreshToken) return res.status(400).json({error : {msg : "No refreshToken provided"}})
    try{
        const dbToken = await RefreshToken.findOne({token : refreshToken});
        if(!dbToken) return res.status(404).json({error : {msg : "Resource not found"}});

        await RefreshToken.findOneAndDelete({token : refreshToken});
        res.status(200).json({success : {msg : "Logged out"}});
    }catch(err){
        next(err)
    }
}