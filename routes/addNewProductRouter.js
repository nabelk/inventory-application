const express = require('express');
const router = express.Router();
const addNewProductController = require('../controllers/addNewProductController');

router.get('/', addNewProductController.showAddProductForm);
router.post('/', addNewProductController.validateProduct, addNewProductController.addNewProduct);

module.exports = router;
