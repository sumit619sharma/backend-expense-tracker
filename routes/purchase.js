const express = require("express");

const { purchasePremium,updateTransactionStatus ,showLeaderBoard} = require("../controllers/purchase");
const {isAuthrorized} = require('../controllers/auth')
const router = express.Router();

router.get("/premiummembership",isAuthrorized, purchasePremium);
router.get("/showLeaderboard",isAuthrorized, showLeaderBoard);
router.post("/updatetransactionstatus", isAuthrorized, updateTransactionStatus);

module.exports = router;
