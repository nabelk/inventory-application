const db = require('../db/queries');

const showInventoryItems = async (req, res) => {
    const currentPage = req.params.pagenum || 1;
    const allInventoryItemsCount = await db.getInventoryItemsCount();
    const allCategoryCount = await db.getCategoryCounts();
    const allBrands = await db.getBrands();
    const inventoryItems = await db.getInventoryItemsOffset(
        currentPage && Number(`${currentPage - 1}0`),
    );
    res.render('index', {
        items: inventoryItems,
        page: req.path === '/' ? 1 : Number(currentPage),
        allItemsCount: allInventoryItemsCount[0].count,
        categoryCount: allCategoryCount,
        allBrands,
        isFilter: false,
        isSearch: false,
        isIndex: true,
    });
};

module.exports = {
    showInventoryItems,
};
