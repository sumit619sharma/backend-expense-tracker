const express = require('express');

const {postAddExpense ,getAddedExpense,editAddedExpense,deleteExpense,getExpenseById,downloadExpense, previousDownloads} = require('../controllers/expense');
const {isAuthrorized} = require('../controllers/auth')
const router = express.Router();

router.route('/')
.get( isAuthrorized, getAddedExpense)
.post(isAuthrorized, postAddExpense)
.put(isAuthrorized, editAddedExpense)

router.route('/delete/:id')
.delete(isAuthrorized,deleteExpense)

router.route('/get-one/:id')
.get(getExpenseById)


router.get('/download', isAuthrorized, downloadExpense)
router.get('/previousDownloads', isAuthrorized, previousDownloads)

module.exports = router;