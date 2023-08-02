const express = require('express');

const {postAddProduct,getAddedProduct,deleteProduct} = require('../controllers/seller');

const router = express.Router();

router
.route('/add-product')
.post(postAddProduct)

router
.route('/get-product')
.get(getAddedProduct)

router
.route('product/delete/:id')
.delete(deleteProduct)


module.exports = router;