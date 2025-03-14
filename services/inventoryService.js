class InventoryService {
    constructor(db) {
        this.db = db;
    }

    async getInventoryItem(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT * FROM tbl_inventory_item
                WHERE id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting inventory:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async editInventoryItem(id, data) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                UPDATE tbl_inventory_item
                SET 
                    name = ?,
                    quantity = ?,
                    cost = ?,
                    unit_id = ?
                WHERE id = ?`,
                [data.name, data.quantity, data.cost, data.unit_id, id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting inventory:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getAllInventoryItem() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    i.id,
                    i.name,
                    CONCAT(i.quantity, ' ', u.name) AS quantity,
                    CONCAT(i.cost, '/', u.name) AS cost
                FROM tbl_inventory_item i
                JOIN tbl_unit u ON i.unit_id = u.id`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting inventory:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getAllInventoryItem2() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    i.id,
                    CONCAT(i.name, ' (', u.name, ')') AS name
                FROM tbl_inventory_item i
                JOIN tbl_unit u ON i.unit_id = u.id`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting inventory:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async addInventoryItem(data) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_inventory_item (name, cost, quantity, unit_id)
                VALUES (?, ?, ?, ?)`,
                [data.name, data.cost, data.quantity, data.unit_id],
                (err, result) => {
                    if (err) {
                        console.error('Error adding inventory:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async addSupply(data) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_order_supply (manager_id, supplier_name)
                VALUES (?, ?)`,
                [data.manager_id, data.supplier_name],
                (err, result) => {
                    if (err) {
                        console.error('Error adding supply:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getLatestSupply() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT id
                FROM tbl_order_supply
                ORDER BY id DESC
                LIMIT 1`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting supply:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getAllSupply() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    s.id,
                    s.date_recorded AS date,
                    CONCAT(e.first_name, ' ', e.last_name) AS manager,
                    s.supplier_name
                FROM tbl_order_supply s
                JOIN tbl_manager m ON s.manager_id = m.id
                JOIN tbl_employee e ON m.employee_id = e.id`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting supply:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async addSupplyItem(data) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_order_supply_item (order_supply_id, inventory_item_id, quantity, cost)
                VALUES (?, ?, ?, ?)`,
                [data.order_supply_id, data.inventory_item_id, data.quantity, data.cost],
                (err, result) => {
                    if (err) {
                        console.error('Error adding supply item:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getSupplyItems(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    i.name,
                    u.name AS unit,
                    oi.quantity,
                    CONCAT(oi.cost, '/', u.name) AS cost
                FROM tbl_order_supply o
                JOIN tbl_order_supply_item oi ON oi.order_supply_id = o.id
                JOIN tbl_inventory_item i ON oi.inventory_item_id = i.id
                JOIN tbl_unit u ON i.unit_id = u.id
                WHERE o.id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting inventory:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getSupplyItems2(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    o.id,
                    o.supplier_name AS supplier,
                    i.name,
                    u.name AS unit,
                    oi.quantity,
                    CONCAT(oi.cost, '/', u.name) AS cost
                FROM tbl_order_supply o
                JOIN tbl_order_supply_item oi ON oi.order_supply_id = o.id
                JOIN tbl_inventory_item i ON oi.inventory_item_id = i.id
                JOIN tbl_unit u ON i.unit_id = u.id
                WHERE i.id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting inventory:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getSupply(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT * FROM tbl_order_supply
                WHERE id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting inventory:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getSupplyItems3(order_supply_id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    order_supply_id,
                    inventory_item_id,
                    quantity,
                    cost
                FROM tbl_order_supply_item
                WHERE order_supply_id = ?`,
                [order_supply_id],
                (err, result) => {
                    if (err) {
                        console.error('Error getting inventory:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async editSupply(id, data) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                UPDATE tbl_order_supply
                SET supplier_name = ?
                WHERE id = ?`,
                [data.supplier_name, id],
                (err, result) => {
                    if (err) {
                        console.error('Error editing supply:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async editSupplyItem(id, data) {
        console.log(id+'data--->'+JSON.stringify(data));
        return new Promise((resolve, reject) => {
            this.db.query(`
                DELETE FROM tbl_order_supply_item
                WHERE order_supply_id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error editing supply item:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
            data.forEach(e => {
                this.db.query(`
                    INSERT INTO tbl_order_supply_item
                    (order_supply_id, inventory_item_id, quantity, cost)
                    VALUES
                    (?, ?, ?, ?)`,
                    [id, e.inventory_item_id, e.quantity, e.cost],
                    (err, result) => {
                        if (err) {
                            console.error('Error editing supply item:', err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        });
    }

    async addStockout(id, data) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                INSERT INTO tbl_stockout (inventory_item_id, remarks, manager_id)
                VALUES (?, ?, ?)`,
                [id, data.remarks, data.manager_id],
                (err, result) => {
                    if (err) {
                        console.error('Error adding stockout:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async getAllStockouts() {
        return new Promise((resolve, reject) => {
            this.db.query(`
                SELECT
                    s.id,
                    s.date_recorded AS date,
                    i.name AS item,
                    s.remarks,
                    CONCAT(e.first_name, ' ', e.last_name) AS manager
                FROM tbl_stockout s
                JOIN tbl_inventory_item i ON s.inventory_item_id = i.id
                JOIN tbl_manager m ON s.manager_id = m.id
                JOIN tbl_employee e ON m.employee_id = e.id`,
                (err, result) => {
                    if (err) {
                        console.error('Error getting stockout:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    async deleteSupply(id) {
        return new Promise((resolve, reject) => {
            this.db.query(`
                DELETE FROM tbl_order_supply_item WHERE order_supply_id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error deleting supply:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
            this.db.query(`
                DELETE FROM tbl_order_supply WHERE id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error deleting supply:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }
}

module.exports = InventoryService;