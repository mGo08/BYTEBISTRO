class MenuService {
    constructor(db) {
        this.db = db;
    }

    async get(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT * FROM tbl_menu_item
                WHERE id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting menu item:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async get2(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT * FROM tbl_menu_item_ingredients
                WHERE menu_item_id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting menu item ingredients:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async editMenuItem(id, data) {
        // console.log('data--->'+data);
        return new Promise((resolve, reject) => {
            this.db.query(`
                UPDATE tbl_menu_item
                SET
                    name = ?,
                    price = ?,
                    category_id = ?
                WHERE
                    id = ?;`,
                [data.name, data.price, data.category_id, id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting menu item ingredients:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async editMenuItemIngredients(menu_item_id, data) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                DELETE FROM tbl_menu_item_ingredients
                WHERE menu_item_id = ?`,
                [menu_item_id],
                (err, result) => {
                    if (err) {
                        console.error('Error editing menu item ingredients:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
            data.forEach(e => {
                this.db.query(`
                    INSERT INTO tbl_menu_item_ingredients
                    (menu_item_id, inventory_item_id, quantity, unit_id, cost)
                    VALUES
                    (?, ?, ?, ?, ?)`,
                    [menu_item_id, e.inventory_item_id, e.quantity, e.unit_id, e.cost],
                    (err, result) => {
                        if (err) {
                            console.error('Error editing menu item ingredients:', err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        });
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    m.id,
                    m.name,
                    c.name AS category,
                    m.price,
                    SUM(mii.cost * mii.quantity) AS cost
                FROM tbl_menu_item m
                JOIN tbl_menu_item_category c ON m.category_id = c.id
                LEFT JOIN tbl_menu_item_ingredients mii ON m.id = mii.menu_item_id
                GROUP BY m.id;`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting menu:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getCategories() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT * FROM tbl_menu_item_category`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting menu categories:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async addCategory(name) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_menu_item_category (name)
                VALUES (?)`,
                [name],
                (err, result) => {
                    if (err) {
                        console.error('Error getting menu categories:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async addMenu(data) {
        console.log('data --> '+data);
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_menu_item (name, price, category_id)
                VALUES (?, ?, ?)`,
                [data.name, data.price, data.category_id],
                (err, result) => {
                    if (err) {
                        console.error('Error adding menu:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async addMenuItem(data) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_menu_item_ingredients (menu_item_id, inventory_item_id, quantity, cost, unit_id)
                VALUES (?, ?, ?, ?, ?)`,
                [data.menu_item_id, data.inventory_item_id, data.quantity, data.cost, data.unit_id],
                (err, result) => {
                    if (err) {
                        console.error('Error adding menu:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getLatestMenu() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT id FROM tbl_menu_item ORDER BY id DESC LIMIT 1`,
                (err, result) => {
                    if (err) {
                        console.error('Error adding menu:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getIngredients(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    i.name AS ingredient,
                    mii.quantity,
                    u.name AS unit,
                    CONCAT(mii.cost,'/',u.name) AS cost,
                    mii.quantity * mii.cost AS subtotal
                FROM tbl_menu_item_ingredients mii
                JOIN tbl_inventory_item i ON mii.inventory_item_id = i.id
                JOIN tbl_unit u ON mii.unit_id = u.id
                WHERE mii.menu_item_id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting ingredients:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async deleteMenu(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                DELETE FROM tbl_menu_item_ingredients WHERE menu_item_id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error deleting menu:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
            this.db.query(`
                DELETE FROM tbl_menu_item WHERE id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error deleting menu:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }
}

module.exports = MenuService;