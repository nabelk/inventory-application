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

const getBrands = async () => {
    const { rows } = await pool.query('SELECT brand FROM inventory GROUP BY brand ORDER BY brand');
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

const getDistinct = async (column) => {
    const allowedColumns = ['category', 'brand'];
    if (!allowedColumns.includes(column)) throw new Error('Invalid column name');
    const { rows } = await pool.query(
        `SELECT DISTINCT ${column} FROM inventory ORDER BY ${column}`,
    );
    return rows;
};

const insertProduct = async (colValues) => {
    const { product, brand, category, stock, price } = colValues;
    await pool.query(
        'INSERT INTO inventory (product, price, brand, stock, category) VALUES ($1,$2,$3,$4,$5)',
        [product, price, brand, stock, category],
    );
};

const deleteProduct = async (id) => {
    await pool.query('DELETE FROM inventory WHERE id = ($1)', [id]);
};

const updateProduct = async (colValues) => {
    const { id, product, brand, category, stock, price } = colValues;
    await pool.query(
        'UPDATE inventory SET brand = ($1), product = ($2), category = ($3), stock =($4), price =($5) WHERE id = ($6) ',
        [brand, product, category, stock, price, id],
    );
};

module.exports = {
    getAllInventoryItems,
    getInventoryItemsOffset,
    getInventoryItemsCount,
    getCategoryCounts,
    getBrands,
    getFilterItems,
    getSearchItem,
    getDistinct,
    insertProduct,
    deleteProduct,
    updateProduct,
};
