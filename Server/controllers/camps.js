const express = require('express');
const Camp = require('../models/Camp');

exports.getCamp = async (req , res , next)=>{
    const campId = req.params.id;
    try{
       const foundCamp = await Camp.findById(campId)
       if(!foundCamp) return res.status(404).json({error : "Resource not found" , user : req.user});
       res.status(200).json({data : foundCamp , user : req.user});
    }catch(err){
        next(err)
    }
}


exports.createCamp = async(req, res , next)=>{
    const campData = req.body;
    campData.author = req.user._id;
    try{
        const createdCamp = await Camp.create(campData);
        res.status(200).json({data : createdCamp , user : req.user});
    }catch(err){
        next(err)
    }
}

exports.updateCamp = async(req , res , next)=>{
    const campData = req.body;
    const campId = req.params.id;
    try{
        const foundCamp = await Camp.findById(campId);
        if(!foundCamp) return res.status(404).json({error : {msg :"Resource not found" }, user : req.user});
        try{
            await Camp.findByIdAndUpdate(campId , campData);
            res.status(200).json({msg : "Successfully updated" , user : req.user})
        }catch(err2){
            next(err2)
        }
    }catch(err){
        next(err)
    }
}

exports.deleteCamp = async (req , res , next)=>{
    const campId = req.params.id;
    try{
        const foundCamp = await Camp.findById(campId);
        if(!foundCamp) return res.status(404).json({error : {msg : "Resource not found"} , user : req.user})
        try{
            await Camp.findByIdAndDelete(campId);
            res.status(200).json({msg : "Resource deleted Successfully" , user : req.user});
        }catch(err2){
            next(err)
        }
    }catch(err){
        next(err)
    }
}


exports.getAllCamps = async (req,  res , next)=>{
    try{
        const allCamps = await Camp.find();
        res.status(200).json({data : allCamps , user : req.user})
    }catch(err){
        next(err)
    }
}

exports.authorizeUser = async(req , res , next)=>{
    const user = req.user;
    try{
        const camp = await Camp.findById(req.params.id);
        if(!camp) return res.status(404).json({error : {msg : "resource not found"}});
        if(!camp.author.equals(user._id)) return res.status(403).json({error : {msg : "You have no access to do that"}})
        next();
    }catch(err){
        next(err)
    }
}
