const express = require('express');
const router = express.Router();
const deleteProductController = require('../controllers/deleteProductController');

router.delete('/:id', deleteProductController.deleteProduct);

module.exports = router;
