const express = require('express');

const {forgotPassword,resetPassword, updatePassword} = require('../controllers/password');

const router = express.Router();

router.post('/forgotpassword',forgotPassword)
router.get('/resetpassword/:uuid',resetPassword)
router.get('/updatepassword/:resetpasswordid',updatePassword)






module.exports = router;