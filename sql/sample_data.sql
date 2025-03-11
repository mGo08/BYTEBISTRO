-- tbl_employee_schedule data
INSERT INTO tbl_employee_schedule (name) VALUES 
('Morning Shift'), 
('Afternoon Shift'), 
('Night Shift');

-- tbl_employee_role data
INSERT INTO tbl_employee_role (name) VALUES 
('Owner');

-- tbl_employee data
INSERT INTO tbl_employee (first_name, last_name, salary, email, username, password, role_id, schedule_id) VALUES
('Juan', 'Dela Cruz', 25000.00, 'juan.delacruz@email.com', 'abc', '123', 1, 1);

-- tbl_manager data
INSERT INTO tbl_manager (employee_id, date_assigned) VALUES
(1, '2023-01-15 08:00:00');

INSERT INTO tbl_activity_logs (panel, action, manager_id) VALUES
('Dashboard', 'hello world!', 1);

-- tbl_unit data
INSERT INTO tbl_unit (name) VALUES 
('kilogram'), 
('gram'), 
('liter'), 
('piece');

-- tbl_unit_convert data
INSERT INTO tbl_unit_convert (unit_id1, unit_id2, ratio) VALUES 
(1, 2, 1000); -- kilogram to gram

-- tbl_menu_item_category data
INSERT INTO tbl_menu_item_category (name) VALUES 
('Category A'), 
('Category B');

-- tbl_menu_item data
INSERT INTO tbl_menu_item (name, price, category_id, is_available) VALUES
('Meal A', 150.00, 1, 1),
('Meal B', 180.00, 1, 1),
('Meal C', 100.00, 2, 1);

-- tbl_inventory_item data
INSERT INTO tbl_inventory_item (name, quantity, cost, unit_id) VALUES
('Ingredient A', 10, 500.00, 1), 
('Ingredient B', 5, 300.00, 1), 
('Ingredient C', 20, 100.00, 4); 

-- tbl_menu_item_ingredients data
INSERT INTO tbl_menu_item_ingredients (menu_item_id, inventory_item_id, quantity, cost, unit_id) VALUES
(1, 1, 200, 100.00, 2), -- Meal A uses 200 grams of Ingredient A
(1, 2, 100, 30.00, 2),  -- Meal A uses 100 grams of Ingredient B
(2, 2, 150, 45.00, 2),  -- Meal B uses 150 grams of Ingredient B
(3, 3, 1, 100.00, 4);     -- Meal C uses 1 piece of Ingredient C