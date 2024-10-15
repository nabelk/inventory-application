const db = require('../db/queries');

const showSearchResult = async (req, res) => {
    const allCategoryCount = await db.getCategoryCounts();
    const allBrands = await db.getBrands();
    const searchItems = await db.getSearchItem(req.query.search);
    // Implement render !searchItems for err
    res.render('index', {
        items: searchItems,
        categoryCount: allCategoryCount,
        allBrands,
        isIndex: false,
        isFilter: false,
    });
};

module.exports = {
    showSearchResult,
};
