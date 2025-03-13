class UnitService {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT * FROM tbl_unit`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting units:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async add(name) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_unit (name)
                VALUES (?)`,
                [name],
                (err, result) => {
                    if (err) {
                        console.error('Error adding unit:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }
}

module.exports = UnitService;