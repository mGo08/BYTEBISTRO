class MenuService {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT m.id, m.name, m.price, c.name
                FROM tbl_menu_item m
                JOIN tbl_menu_item_category c ON m.category_id = c.id`,
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
}

module.exports = MenuService;