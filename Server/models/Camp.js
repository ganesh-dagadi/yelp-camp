const mongoose = require("mongoose");

const CampSchema = new mongoose.Schema({
    title : {type: String , required : true},
    image : {type: String , required : true},
    descp : {type: String , required : true},
    author : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Camp = mongoose.model('camp' , CampSchema);

module.exports = Camp;