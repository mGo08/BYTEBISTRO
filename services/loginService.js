class LoginService {
    constructor(db) {
        this.db = db;
    }

    async validate(credentials) {
        const { username, password } = credentials;
        return new Promise((resolve, reject) => {
            this.db.query(
                'SELECT e.username, e.password, m.id AS manager_id '+
                'FROM tbl_employee e '+
                'JOIN tbl_manager m ON e.id = m.employee_id '+
                'WHERE e.username = ?',
                [username],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
        
                    if (!result || result.length === 0) {
                        return resolve(null);
                    }
        
                    const user = result[0];
                    if (password === user.password) {
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                }
            );
        });
    }
}

module.exports = LoginService;