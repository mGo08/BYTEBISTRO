class EmployeeService {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    e.id,
                    CONCAT(e.first_name, ' ', e.last_name) AS name,
                    role.name AS role,
                    sched.name AS schedule,
                    e.salary,
                    e.email
                FROM tbl_employee e
                JOIN tbl_employee_role role ON e.role_id = role.id
                JOIN tbl_employee_schedule sched ON e.schedule_id = sched.id`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting employees:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async get(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    id,
                    first_name,
                    last_name,
                    role_id,
                    schedule_id,
                    salary,
                    email
                FROM tbl_employee
                WHERE id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting employee:', err);
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
                SELECT
                    e.id,
                    CONCAT(e.first_name, ' ', e.last_name) AS name,
                    role.name AS role,
                    sched.name AS schedule,
                    e.salary,
                    e.email
                FROM tbl_employee e
                JOIN tbl_employee_role role ON e.role_id = role.id
                JOIN tbl_employee_schedule sched ON e.schedule_id = sched.id
                WHERE e.id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting employee:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async add(e) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_employee (first_name, last_name, salary, email, username, password, role_id, schedule_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [e.first_name, e.last_name, e.salary, e.email, e.username, e.password, e.role_id, e.schedule_id],
                (err, result) => {
                    if (err) {
                        console.error('Error adding employee:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async edit(id, e) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                UPDATE tbl_employee
                SET 
                    first_name = ?,
                    last_name = ?,
                    role_id = ?,
                    schedule_id = ?,
                    salary = ?,
                    email = ?
                WHERE 
                    id = ?`,
                [e.first_name, e.last_name, e.role_id, e.schedule_id, e.salary, e.email, id],
                (err, result) => {
                    if (err) {
                        console.error('Error editing employee:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async remove(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                DELETE FROM tbl_employee WHERE id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error removing employee:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getRoles() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT id, name
                FROM tbl_employee_role`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting roles:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getSchedules() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT id, name
                FROM tbl_employee_schedule`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting schedules:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }
}

module.exports = EmployeeService;