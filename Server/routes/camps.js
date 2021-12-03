const router = require("express").Router();
const {validateCreateCamp} = require('../validators/camps');
const {authenticateUser} = require('../utils/auth');

const {
    getAllCamps,
    createCamp,
    getCamp,
    updateCamp,
    deleteCamp,
    authorizeUser
} = require('../controllers/camps');

router.get('/' , getAllCamps);

router.post('/' ,validateCreateCamp, authenticateUser, createCamp);

router.put('/:id' , validateCreateCamp ,authenticateUser, authorizeUser , updateCamp);

router.delete('/:id' ,authenticateUser, authorizeUser , deleteCamp);

router.get('/:id' , getCamp);

module.exports = router;