const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const filterController = require('../controllers/filterController');
const searchController = require('../controllers/searchController');

router.get('/', indexController.showInventoryItems);
router.get('/page=:pagenum', indexController.showInventoryItems);
router.post('/filteritems', filterController.showFilterItems);
router.get('/search', searchController.showSearchResult);

module.exports = router;
