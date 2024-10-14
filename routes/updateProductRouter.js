const express = require('express');
const router = express.Router();
const updateProductController = require('../controllers/updateProductController');

router.put('/:id', updateProductController.updateProduct);

module.exports = router;
