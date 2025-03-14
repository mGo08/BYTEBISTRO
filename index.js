const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql2');

const app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.urlencoded({ extended: true }));
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





const LoginService = require('./services/loginService');
const ActivityLogService = require('./services/activityLogService');
const EmployeeService = require('./services/employeeService');
const SalesService = require('./services/salesService');
const InventoryService = require('./services/inventoryService');
const UnitService = require('./services/unitService');
const MenuService = require('./services/menuService');
const loginService = new LoginService(db);
const activityLogService = new ActivityLogService(db);
const employeeService = new EmployeeService(db);
const salesService = new SalesService(db);
const inventoryService = new InventoryService(db);
const unitService = new UnitService(db);
const menuService = new MenuService(db);

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect("dashboard");
    } else {
        res.redirect("login");
    }
});

app.get('/login', async(req, res) => {
    res.render("login");
});

app.post('/login', async (req, res) => {
    try {
        const data = await loginService.validate(req.body);
        if (data) {
            req.session.user = { username: data.username, manager_id: data.manager_id };
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // res.json({ success: true, message: 'Logout successful' }); // Send a JSON response
        // Or, if you want to redirect:
        res.redirect('/'); // Redirect to the login page
    });
});

app.get('/nav', async(req, res) => {
    res.render('nav');
});

app.get('/dashboard', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        const data = await activityLogService.getAll();
        res.render('dashboard', { data: data, currentPage: 'dashboard' });
    } catch (error) {
        console.error('Error handling /dashboard request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/employees', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        const data = await employeeService.getAll();
        res.render('employees', { data: data, currentPage: 'employees' });
    } catch (error) {
        console.error('Error handling /employees request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/employees/add', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        const roles = await employeeService.getRoles();
        const schedules = await employeeService.getSchedules();
        res.render('employees_add', { data: { roles: roles, schedules: schedules }, currentPage: 'employees' });
    } catch (error) {
        console.error('Error handling /employees/add request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/employees/add', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        const result = await employeeService.add(req.body);

        const activity = { panel: 'Add Employee', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);

        res.redirect('/employees');
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes('username')) {
            // Duplicate username error
            res.status(400).json({ success: false, error: 'Username already exists. Please choose a different username.' });
        } else {
            // Other errors
            console.error('Error adding employee:', error);
            res.status(500).json({ success: false, error: 'An error occurred while adding the employee.' });
        }
    }
});

app.get('/employees/edit', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.redirect('/employees');
});

app.get('/employees/edit/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        const data = await employeeService.get(req.params.id);
        const roles = await employeeService.getRoles();
        const schedules = await employeeService.getSchedules();
        res.render('employees_edit', { data: data[0], roles: roles, schedules: schedules, id: req.params.id, currentPage: 'employees' });
    } catch (error) {
        console.error('Error handling /employees/edit request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/employees/edit/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        // console.log(req.body);
        const result = await employeeService.edit(req.params.id, req.body);

        const activity = { panel: 'Edit Employee', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity)

        res.redirect('/employees');
    } catch (error) {
        console.error('Error handling /employees/edit request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/employees/delete', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.redirect('/employees');
});

app.get('/employees/delete/:id', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        const data = await employeeService.get2(req.params.id);
        // console.log(data);
        res.render('employees_delete', { data: data, id: req.params.id, currentPage: 'employees' });
    } catch (error) {
        console.error('Error handling /employees/delete request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/employees/delete/:id', async (req, res) =>  {
    try {
        if (!req.session.user) {
            return res.redirect('/');
        }
    
        const result = await employeeService.remove(req.params.id);
    
        const activity = { panel: 'Delete Employee', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);
    
        res.redirect('/employees');
    } catch (error) {
        console.error('Error handling /employees/delete request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/sales', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        const data = await salesService.getAll();
        res.render('sales', { data: data, currentPage: 'sales' });
    } catch (error) {
        console.error('Error getting sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/sales/add', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const result = await salesService.add(req.session.user.manager_id);
        res.redirect('/sales');
    } catch (error) {
        console.error('Error adding sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/orders', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const data = null; //await orderService.getAll();
        res.render('orders', { data: data, currentPage: 'orders' });
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/menu', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const data = await menuService.getAll();
        res.render('menu', { data: data, currentPage: 'menu' });
    } catch (error) {
        console.error('Error getting menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/menu/add', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const categories = await menuService.getCategories();
        const ingredients = await inventoryService.getAllInventoryItem();
        const units = await unitService.getAll();
        res.render('menu_add', { categories: categories, units: units, ingredients: ingredients, currentPage: 'menu' });
    } catch (error) {
        console.error('Error getting menu/add:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/menu/add', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        const data = req.body;
        console.log(data);
        const result = await menuService.addMenu(data.menu);

        const menu_item_id = (await menuService.getLatestMenu())[0].id;
        data.items.forEach(async (i) => {
            i.menu_item_id = menu_item_id;
            const _ = await menuService.addMenuItem(i);
        });

        const activity = { panel: 'Add Menu Item', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);

        res.redirect('/menu');
    } catch (error) {
        console.error('Error posting menu/add:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/menu/edit', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    res.redirect('/menu');
});

app.get('/menu/edit/:id', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const categories = await menuService.getCategories();
        const ingredients = await inventoryService.getAllInventoryItem();
        const units = await unitService.getAll()
        const menu = (await menuService.get(req.params.id))[0];
        const items = await menuService.get2(req.params.id);
        res.render('menu_edit', {
            id: req.params.id,
            categories: categories,
            ingredients: ingredients,
            units: units,
            data: { menu: menu, items: items },
            currentPage: 'menu'
        });
    } catch (error) {
        console.error('Error getting menu/edit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/menu/edit/:id', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const data = req.body;
        console.log(data);
        const result = await menuService.editMenuItem(req.params.id, data.menu);

        // data.items.forEach(async (i) => {
        //     // console.log(i);
        //     const _ = await menuService.editMenuItemIngredients(req.params.id, i);
        // });
        const _ = await menuService.editMenuItemIngredients(req.params.id, data.items);

        const activity = { panel: 'Edit Menu Item', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);

        res.redirect('/menu');
    } catch (error) {
        console.error('Error posting menu/edit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/menu/view', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    res.redirect('/menu');
});

app.get('/menu/view/:id', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const data = await menuService.getIngredients(req.params.id);
        res.render('menu_view', { data: data, currentPage: 'menu' });
    } catch (error) {
        console.error('Error getting menu/add:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/menu/add/category', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const categories = await menuService.getCategories();
        res.render('menu_add_category', { categories: categories, currentPage: 'menu' });
    } catch (error) {
        console.error('Error getting menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/menu/add/category', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const result = await menuService.addCategory(req.body.name);

        const activity = { panel: 'Add Category', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);

        res.redirect('/menu');
    } catch (error) {
        console.error('Error posting menu/add/category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/menu/delete/:id', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const result = await menuService.deleteMenu(req.params.id);
        const activity = { panel: 'Delete Menu Item', action: `Deleted id ${req.params.id}`, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);
        res.redirect('/menu');
    } catch (error) {
        console.error('Error getting menu/delete:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/inventory', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const data = await inventoryService.getAllInventoryItem();
        res.render('inventory', { data: data, currentPage: 'inventory' });
    } catch (error) {
        console.error('Error getting inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/inventory/add', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const units = await unitService.getAll();
        res.render('inventory_add', { units: units, currentPage: 'inventory' });
    } catch (error) {
        console.error('Error getting inventory/add:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/inventory/add', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const result = await inventoryService.addInventoryItem(req.body);

        const activity = { panel: 'Add Inventory', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);

        res.redirect('/inventory');
    } catch (error) {
        console.error('Error posting /inventory/add:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/inventory/add/unit', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const units = await unitService.getAll();
        res.render('inventory_add_unit', { units: units, currentPage: 'inventory' });
    } catch (error) {
        console.error('Error getting inventory/add/unit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/inventory/add/unit', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const result = await unitService.add(req.body.name);

        const activity = { panel: 'Add Unit', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);

        res.redirect('/inventory');
    } catch (error) {
        console.error('Error adding inventory/add/unit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/inventory/edit', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.redirect('/inventory');
});

app.get('/inventory/edit/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const units = await unitService.getAll();
        const data = (await inventoryService.getInventoryItem(req.params.id))[0];
        res.render('inventory_edit', { id: req.params.id, units: units, data: data, currentPage: 'inventory' });
    } catch (error) {
        console.error('Error getting inventory/edit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/inventory/edit/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const result = await inventoryService.editInventoryItem(req.params.id, req.body);

        const activity = { panel: 'Edit Inventory', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity)

        res.redirect('/inventory');
    } catch (error) {
        console.error('Error posting inventory/edit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/inventory/view', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.redirect('/inventory');
});

app.get('/inventory/view/:id', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const data = await inventoryService.getSupplyItems2(req.params.id);
        res.render('inventory_view', { data: data, currentPage: 'inventory' });
    } catch (error) {
        console.error('Error getting inventory/view:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/inventory/stockout', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const data = await inventoryService.getAllStockouts();
        res.render('inventory_stockout', { data: data, currentPage: 'inventory' });
    } catch (error) {
        console.error('Error getting inventory/stockout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/inventory/stockout/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        res.render('inventory_add_stockout', { id: req.params.id, currentPage: 'inventory' });
    } catch (error) {
        console.error('Error getting /inventory/stockout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/inventory/stockout/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        const data = { remarks: req.body.remarks, manager_id: req.session.user.manager_id };
        const result = await inventoryService.addStockout(req.params.id, data);

        const activity = { panel: 'Inventory Stockout', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);

        res.redirect('/inventory');
    } catch (error) {
        console.error('Error posting /inventory/stockout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/supply', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const data = await inventoryService.getAllSupply();
        res.render('supply', { data: data, currentPage: 'supply' });
    } catch (error) {
        console.error('Error getting /supply:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/supply/add', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const data = await inventoryService.getAllInventoryItem2();
        data.manager_id = req.session.user.manager_id;
        res.render('supply_add', { data: data, currentPage: 'supply' });
    } catch (error) {
        console.error('Error getting /supply/add:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/supply/add', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const data = req.body;
        data.supply.manager_id = req.session.user.manager_id;
        const result = await inventoryService.addSupply(data.supply);

        const order_supply_id = (await inventoryService.getLatestSupply())[0].id;
        data.items.forEach(async (i) => {
            i.order_supply_id = order_supply_id;
            const _ = await inventoryService.addSupplyItem(i);
        });

        const activity = { panel: 'Add Supply', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);

        res.redirect('/supply');
    } catch (error) {
        console.error('Error posting /supply/add:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/supply/edit', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    res.redirect('/supply');
});

app.get('/supply/edit/:id', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const id = req.params.id;
        const inventory = await inventoryService.getAllInventoryItem2();
        const supply = (await inventoryService.getSupply(id))[0];
        const supplyItems = await inventoryService.getSupplyItems3(id);
        res.render('supply_edit', { id: id, inventory: inventory, supply: supply, supplyItems: supplyItems, currentPage: 'supply' });
    } catch (error) {
        console.error('Error getting /supply/edit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/supply/edit/:id', async (req, res) =>  {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await inventoryService.editSupply(id, data.supply);

        // data.supplyItems.forEach(async (i) => {
        //     const _ = await inventoryService.editSupplyItem(id, i);
        // });
        const _ = await inventoryService.editSupplyItem(id, data.supplyItems);

        const activity = { panel: 'Edit Supply', action: req.body.action, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);

        res.redirect('/supply');
    } catch (error) {
        console.error('Error posting /supply/edit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/supply/view', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.redirect('/supply');
});

app.get('/supply/view/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        const data = await inventoryService.getSupplyItems(req.params.id);
        res.render('supply_view', { data: data, currentPage: 'supply' });
    } catch (error) {
        console.error('Error getting /supply/view:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/supply/delete/:id', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    try {
        const result = await inventoryService.deleteSupply(req.params.id);
        const activity = { panel: 'Delete Supply', action: `Deleted id ${req.params.id}`, manager_id: req.session.user.manager_id };
        const result2 = await activityLogService.add(activity);
        res.redirect('/supply');
    } catch (error) {
        console.error('Error getting /supply/delete:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});