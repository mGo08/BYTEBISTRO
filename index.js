const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql2');

const app = express();

app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(bodyParser.json());
app.use(session({
    secret: 'Dj*g2$-490+Gp{eSD3%',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));




const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_bar'
});

db.connect();





app.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, './html/dashboard.html'));
    } else {
        res.sendFile(path.join(__dirname, './html/login.html'));
    }
});

app.get('/:page', (req, res) => {
    if (req.session.user) {
        const page = req.params.page;
        res.sendFile(path.join(__dirname, `./html/${page}.html`));
    } else {
        res.redirect('/');
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    db.query(
        'SELECT e.username, e.password '+
        'FROM tbl_employee AS e '+
        'JOIN tbl_manager AS m ON e.id = m.employee_id '+
        'WHERE e.username = ?',
        [username],
        async (err, result) => {
            if (err) {
                console.log(err);
            }

            if (result.length === 0) {
                return res.status(401).json({ error: 'Invalid username or password.' });
            }

            const user = result[0];
            if (password === user.password) {
                req.session.user = { username: username };
                res.json({ success: true, message: 'Login successful' });
            } else {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
        }
    );
});


app.get('/api/dashboard', (req, res) => {
    db.query(`
        SELECT
            al.id,
            al.timestamp,
            al.panel,
            al.action,
        CONCAT(e.first_name, ' ', e.last_name) AS manager
        FROM tbl_activity_logs al
        JOIN tbl_manager m ON al.manager_id = m.id
        JOIN tbl_employee e ON m.employee_id = e.id`,
        async (err, result) => {
            res.json(result);
        }
    );
});

app.get('/api/employees', (req, res) => {
    db.query(`
        SELECT
            e.id,
            CONCAT(e.first_name, ' ', e.last_name) AS name,
            role.name AS role,
            sched.name AS sched,
            e.salary,
            e.email
        FROM tbl_employee e
        JOIN tbl_employee_role role ON e.role_id = role.id
        JOIN tbl_employee_schedule sched ON e.schedule_id = sched.id`,
        async (err, result) => {
            res.json(result);
        }
    );
});

app.get('/api/menu', (req, res) => {
    db.query(`
        SELECT
            mi.name AS name,
            mi.price,
            SUM(mii.cost) AS cost,
            GROUP_CONCAT(
                ii.name,
                ' (',
                mii.quantity,
                ' ',
                u.name,
                ')'
            ) AS ingredients
        FROM tbl_menu_item mi
        JOIN tbl_menu_item_ingredients mii ON mi.id = mii.menu_item_id
        JOIN tbl_inventory_item ii ON mii.inventory_item_id = ii.id
        JOIN tbl_unit u ON mii.unit_id = u.id
        GROUP BY mi.id, mi.name, mi.price`,
        async (err, result) => {
            res.json(result);
        }
    );
});

app.get('/api/inventory', (req, res) => {
    db.query(`
        SELECT
            ii.id,
            ii.name,
            CONCAT(quantity, ' ', u.name) AS quantity,
            CONCAT(cost, '/', u.name) AS cost_per_unit
        FROM tbl_inventory_item ii
        JOIN tbl_unit u ON ii.unit_id = u.id`,
        async (err, result) => {
            res.json(result);
        }
    );
});




const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});