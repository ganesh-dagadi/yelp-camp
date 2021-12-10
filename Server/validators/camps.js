const express = require('express');

exports.validateCreateCamp = async(req , res , next)=>{
    const data = req.body;
    console.log(req.headers.access_token)
    if(!data.title || !data.descp || !data.image) return res.status(400).json({error : {msg : "Missing data" }})
    if(data.title.length == 0) return res.status(400).json({error : {msg : "Title cant be empty"}})
    if(data.descp.length == 0) return res.status(400).json({error : {msg : "descprition cant be empty"}})
    if(data.image.length == 0) return res.status(400).json({error : {msg : "image cant be empty"}})
    if(data.text.length == 0) return res.status(400).json({error : {msg : "image cant be empty"}})
    next()
}