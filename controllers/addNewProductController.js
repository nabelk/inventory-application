const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const showAddProductForm = async (req, res) => {
    const [brand, category] = await Promise.all([
        db.getDistinct('brand'),
        db.getDistinct('category'),
    ]);
    res.render('addProductForm', { brand, category });
};

const [productValidationErr, stockErr, priceErr, brandCategoryErr] = [
    `must only contain letters, numbers, and symbols like - ' " . , : ( ) &`,
    'Stock must be an integer.',
    'Price must be a valid number (float or int).',
    'must only contain letters & numbers.',
];

const validateProduct = [
    body('product')
        .trim()
        .matches(/^[a-zA-Z0-9\s\-\'\".,:()&]+$/)
        .withMessage(`Product ${productValidationErr}`),
    body('stock').trim().isInt().withMessage(stockErr),
    body('price').trim().isFloat({ min: 0 }).withMessage(priceErr),
    body('new_brand')
        .trim()
        .matches(/^[a-zA-Z\s]*$/)
        .withMessage(`New brand ${brandCategoryErr}`)
        .isLength({ min: 0, max: 50 })
        .withMessage('New brand name must be between 0 and 50 characters.'),
    body('new_category')
        .trim()
        .matches(/^[a-zA-Z\s]*$/)
        .withMessage(`New Category ${brandCategoryErr}`)
        .isLength({ min: 0, max: 50 })
        .withMessage('New category name must be between 0 and 50 characters.'),
];

const addNewProduct = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('addProductForm', {
            brand: await db.getDistinct('brand'),
            category: await db.getDistinct('category'),
            err: errors.array(),
        });
    }

    let { product, brand, category, price, stock, new_brand, new_category } = req.body;
    category = new_category
        ? `${new_category[0].toUpperCase()}${new_category.substring(1)}`
        : category;
    brand = new_brand ? `${new_brand[0].toUpperCase()}${new_brand.substring(1)}` : brand;
    await db.insertProduct({ product, brand, category, stock, price });
    res.redirect('/');
};

module.exports = {
    showAddProductForm,
    addNewProduct,
    validateProduct,
};
