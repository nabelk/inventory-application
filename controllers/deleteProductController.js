require('dotenv').config();
const db = require('../db/queries');

const deleteProduct = async (req, res) => {
    const { adminPassword } = req.body;
    if (adminPassword === process.env.ADMIN_PASSWORD) {
        const { id } = req.params;
        await db.deleteProduct(id);
    } else {
        res.send('Invalid admin password.');
    }

    res.redirect('/');
};

module.exports = { deleteProduct };
