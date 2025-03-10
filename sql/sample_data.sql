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
('Juan', 'Dela Cruz', 25000.00, 'juan.delacruz@email.com', 'juan.delacruz', 'password001', 1, 1);

-- tbl_manager data
INSERT INTO tbl_manager (employee_id, date_assigned) VALUES
(1, '2023-01-15 08:00:00');