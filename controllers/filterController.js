const db = require('../db/queries');

const showFilterItems = async (req, res) => {
    const { category } = req.body;
    const filteritems = await db.getFilterItems(category);
    const allCategoryCount = await db.getCategoryCounts();
    res.render('index', {
        items: filteritems,
        isIndex: false,
        isFilter: true,
        categoryCount: allCategoryCount,
    });
};

module.exports = { showFilterItems };
