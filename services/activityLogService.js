class ActivityLogService {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    al.id,
                    al.timestamp,
                    al.panel,
                    al.action,
                CONCAT(e.first_name, ' ', e.last_name) AS manager
                FROM tbl_activity_logs al
                JOIN tbl_manager m ON al.manager_id = m.id
                JOIN tbl_employee e ON m.employee_id = e.id
                ORDER BY id DESC`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting activity logs:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async add(a) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_activity_logs (panel, action, manager_id) 
                VALUES (?, ?, ?)`,
                [a.panel, a.action, a.manager_id],
                (err, result) => {
                    if (err) {
                        console.error('Error adding activity log:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }
}

module.exports = ActivityLogService;