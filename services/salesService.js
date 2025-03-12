class SalesService {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT s.id, s.date_recorded, CONCAT(e.first_name, ' ', e.last_name) AS manager
                FROM tbl_sales s
                JOIN tbl_manager m ON s.manager_id = m.id
                JOIN tbl_employee e ON m.employee_id = e.id
                ORDER BY id DESC`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting sales:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async add(manager_id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_sales (manager_id) VALUES (?)`,
                [manager_id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting sales:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }
}

module.exports = SalesService;