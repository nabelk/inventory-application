const pool = require('../db/pool');

const getAllInventoryItems = async () => {
    const { rows } = await pool.query(`SELECT * FROM inventory`);
    return rows;
};

const getInventoryItemsOffset = async (offset = 0) => {
    const { rows } = await pool.query('SELECT * FROM inventory OFFSET ($1) LIMIT 10', [offset]);
    return rows;
};

const getInventoryItemsCount = async () => {
    const { rows } = await pool.query('SELECT COUNT(*) FROM inventory');
    return rows;
};

const getCategoryCounts = async () => {
    const { rows } = await pool.query(
        'SELECT category, COUNT(*) FROM inventory GROUP BY category ORDER BY category',
    );
    return rows;
};

const getFilterItems = async (category) => {
    const checkCategoryType = typeof category === 'string' ? [category] : category;
    const { rows } = await pool.query(
        'SELECT * FROM inventory WHERE category = ANY($1::text[]) ORDER BY category',
        [checkCategoryType],
    );
    return rows;
};

const getSearchItem = async (searchQuery) => {
    const searchValue = `%${searchQuery}%`;
    const { rows } = await pool.query(
        'SELECT * FROM inventory WHERE product::text ILIKE ($1) OR brand::text ILIKE ($1) OR category::text ILIKE ($1)',
        [searchValue],
    );
    return rows;
};

module.exports = {
    getAllInventoryItems,
    getInventoryItemsOffset,
    getInventoryItemsCount,
    getCategoryCounts,
    getFilterItems,
    getSearchItem,
};
