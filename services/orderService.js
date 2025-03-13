class OrderService {
    constructor(db) {
        this.db = db;
    }

    // async getAll() {
    //     return new Promise((resolve, reject) => {
    //         this.db.query(``,
    //             (err, result) => {
    //                 if (err) {
    //                     console.error('Error getting orders:', err);
    //                     reject(err);
    //                 } else {
    //                     resolve(result);
    //                 }
    //             }
    //         );
    //     });
    // }
}

module.exports = OrderService;