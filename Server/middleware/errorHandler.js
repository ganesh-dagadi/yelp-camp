const express = require('express');

module.exports = function(err , req , res , next){
    res.status(500).json({error : {msg : "something went wrong"}})
}