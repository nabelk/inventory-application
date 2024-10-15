const db = require('../db/queries');

const showFilterItems = async (req, res) => {
    const { category } = req.body;
    const filteritems = await db.getFilterItems(category);
    const allCategoryCount = await db.getCategoryCounts();
    const allBrands = await db.getBrands();
    res.render('index', {
        items: filteritems,
        isIndex: false,
        isFilter: true,
        categoryCount: allCategoryCount,
        allBrands,
    });
};

module.exports = { showFilterItems };
