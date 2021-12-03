const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
    token : String
})

module.exports = mongoose.model('refreshtoken' , RefreshTokenSchema);