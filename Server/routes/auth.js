const express = require("express");
const {registerUser , loginUser , newToken , logoutUser} = require("../controllers/auth");
const validateUserInput = require("../validators/auth");

let router = express.Router();

router.post('/register' , validateUserInput, registerUser);
router.post('/login' , loginUser);
router.get('/newtoken' , newToken)
router.get('/logout' , logoutUser)

module.exports = router;