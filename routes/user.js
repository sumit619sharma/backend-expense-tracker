const express = require('express');

const {postAddUser,getAddedUser,editAddedUser,deleteUser} = require('../controllers/user');

const router = express.Router();

router
.route('/add-user')
.get(getAddedUser)
.post(postAddUser)
.put(editAddedUser)


router
.route('/delete/:id')
.delete(deleteUser)



module.exports = router;