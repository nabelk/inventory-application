require('dotenv').config();
const db = require('../db/queries');

const updateProduct = async (req, res) => {
    let { product, brand, category, price, stock, new_brand, new_category, adminPassword } =
        req.body;

    if (adminPassword === process.env.ADMIN_PASSWORD) {
        const { id } = req.params;
        category = new_category
            ? `${new_category[0].toUpperCase()}${new_category.substring(1)}`
            : category;
        brand = new_brand ? `${new_brand[0].toUpperCase()}${new_brand.substring(1)}` : brand;
        await db.updateProduct({ id, product, brand, category, stock, price });
    } else {
        res.send('Invalid admin password.');
    }

    res.redirect('/');
};

module.exports = {
    updateProduct,
};
