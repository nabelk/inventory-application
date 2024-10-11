const express = require('express');
const router = express.Router();
const addNewProductController = require('../controllers/addNewProductController');

router.get('/', addNewProductController.showAddProductForm);
router.post('/', addNewProductController.addNewProduct);

module.exports = router;
