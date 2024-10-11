const db = require('../db/queries');

const showAddProductForm = async (req, res) => {
    const [brand, category] = await Promise.all([
        db.getDistinct('brand'),
        db.getDistinct('category'),
    ]);
    res.render('addProductForm', { brand, category });
};

const addNewProduct = async (req, res) => {
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
};
