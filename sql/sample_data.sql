-- tbl_employee_schedule data
INSERT INTO tbl_employee_schedule (name) VALUES 
('Morning Shift'), 
('Afternoon Shift'), 
('Night Shift');

-- tbl_employee_role data
INSERT INTO tbl_employee_role (name) VALUES 
('Waiter'), 
('Cashier'), 
('Chef');

-- tbl_employee data
INSERT INTO tbl_employee (first_name, last_name, salary, email, username, password, role_id, schedule_id) VALUES
('Juan', 'Dela Cruz', 25000.00, 'juan.delacruz@email.com', 'juan.delacruz', 'password123', 1, 1),
('Maria', 'Santos', 30000.00, 'maria.santos@email.com', 'maria.santos', 'password456', 2, 2),
('Pedro', 'Reyes', 40000.00, 'pedro.reyes@email.com', 'pedro.reyes', 'password789', 3, 3);

-- tbl_manager data
INSERT INTO tbl_manager (employee_id, date_assigned) VALUES
(3, '2023-01-15 08:00:00');

-- tbl_unit data
INSERT INTO tbl_unit (name) VALUES 
('kilogram'), 
('gram'), 
('liter'), 
('piece');

-- tbl_unit_convert data
INSERT INTO tbl_unit_convert (unit_id1, unit_id2, ratio) VALUES 
(1, 2, 1000); -- kilogram to gram

-- tbl_sales data
INSERT INTO tbl_sales (date_recorded, manager_id) VALUES
('2023-03-08 12:00:00', 1),
('2023-03-08 19:30:00', 1);

-- tbl_order data
INSERT INTO tbl_order (employee_id, sales_id) VALUES
(1, 1),
(2, 2);

-- tbl_menu_item_category data
INSERT INTO tbl_menu_item_category (name) VALUES 
('Main Course'), 
('Dessert'), 
('Beverage');

-- tbl_menu_item data
INSERT INTO tbl_menu_item (name, price, category_id, is_available) VALUES
('Adobo', 150.00, 1, 1),
('Sinigang', 180.00, 1, 1),
('Halo-halo', 100.00, 2, 1),
('Mango Float', 120.00, 2, 0),
('Iced Tea', 50.00, 3, 1);

-- tbl_inventory_item data
INSERT INTO tbl_inventory_item (name, quantity, cost, unit_id) VALUES
('Pork', 10, 500.00, 1), -- Pork (kilogram)
('Shrimp', 5, 300.00, 1), -- Shrimp (kilogram)
('Mango', 20, 100.00, 4), -- Mangoes (piece)
('Milk', 1, 200.00, 3); -- Milk (liter)

-- tbl_menu_item_ingredients data
INSERT INTO tbl_menu_item_ingredients (menu_item_id, inventory_item_id, quantity, cost, unit_id) VALUES
(1, 1, 200, 100.00, 2), -- Adobo uses 200 grams of Pork
(2, 2, 150, 75.00, 2), -- Sinigang uses 150 grams of Shrimp
(3, 3, 1, 20.00, 4), -- Halo-halo uses 1 piece of Mango
(4, 3, 2, 40.00, 4), -- Mango Float uses 2 pieces of Mango
(4, 4, 100, 20.00, 2); -- Mango Float uses 100 grams of Milk

-- tbl_order_item data
INSERT INTO tbl_order_item (order_id, menu_item_id, quantity, price) VALUES
(1, 1, 2, 150.00), -- Order 1 has 2 orders of Adobo
(1, 3, 1, 100.00), -- Order 1 has 1 order of Halo-halo
(2, 2, 1, 180.00); -- Order 2 has 1 order of Sinigang

-- tbl_stockout data
INSERT INTO tbl_stockout (date_recorded, inventory_item_id, manager_id, quantity, cost, unit_id, remarks) VALUES
('2023-03-08 10:00:00', 3, 1, 5, 100.00, 4, 'Ran out of mangoes');

-- tbl_order_supply data
INSERT INTO tbl_order_supply (date_recorded, manager_id, supplier_name) VALUES
('2023-03-07 14:00:00', 1, 'Supplier A');

-- tbl_order_supply_item data
INSERT INTO tbl_order_supply_item (order_supply_id, inventory_item_id, quantity, cost) VALUES
(1, 3, 10, 200.00); -- Ordered 10 Mangoes from Supplier A

-- tbl_event_name data
INSERT INTO tbl_event_name (name) VALUES 
('Birthday Party'),
('Wedding Reception'),
('Corporate Event');

-- tbl_event data
INSERT INTO tbl_event (event_name_id, tickets_sold, ticket_price, sales_id) VALUES
(1, 25, 500.00, 1),
(2, 30, 1000.00, 2);

-- tbl_guest data
INSERT INTO tbl_guest (name) VALUES 
('Jose Rizal'),
('Andres Bonifacio'),
('Emilio Aguinaldo');

-- tbl_event_guests data
INSERT INTO tbl_event_guests (event_id, guest_id, talent_fee) VALUES
(1, 1, 10000.00),
(2, 2, 15000.00),
(2, 3, 12000.00);

-- tbl_event_logistics data
INSERT INTO tbl_event_logistics (event_id, transport_cost, accomodation_cost, other_cost) VALUES
(1, 5000.00, 10000.00, 2000.00),
(2, 10000.00, 20000.00, 5000.00);

-- tbl_equipment data
INSERT INTO tbl_equipment (name) VALUES 
('Sound System'),
('Projector'),
('Microphone');

-- tbl_event_logistics_equipment data
INSERT INTO tbl_event_logistics_equipment (event_logistics_id, equip_id, quantity, cost) VALUES
(1, 1, 1, 5000.00),
(1, 3, 2, 1000.00),
(2, 2, 1, 3000.00);