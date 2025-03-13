drop database db_bar;
create database db_bar;
use db_bar;

create table tbl_employee_schedule (
	id int auto_increment,
	name varchar(50) not null unique,
	primary key (id)
);

create table tbl_employee_role (
	id int auto_increment,
	name varchar(50) not null unique,
	primary key (id)
);

create table tbl_employee (
	id int auto_increment,
	first_name varchar(100) not null,
	last_name varchar(100) not null,
	salary decimal(10,2) not null,
	email varchar(50) not null,
	username varchar(50) not null unique,
	password varchar(50) not null,
	role_id int not null,
	schedule_id int not null,
	foreign key (role_id) references tbl_employee_role (id),
	foreign key (schedule_id) references tbl_employee_schedule (id),
	primary key (id)
);

create table tbl_manager (
	id int auto_increment,
	employee_id int not null,
	date_assigned datetime not null,
	primary key (id),
	foreign key (employee_id) references tbl_employee (id)
);




create table tbl_activity_logs (
	id int auto_increment primary key,
	timestamp datetime default current_timestamp,
	panel varchar(255) not null,
	action varchar(255) not null,
	manager_id int not null,
		foreign key (manager_id) references tbl_manager (id)
);




create table tbl_unit (
	id int auto_increment primary key,
	name varchar(50) not null
);

create table tbl_unit_convert (
	unit_id1 int not null,
		foreign key (unit_id1) references tbl_unit (id),
	unit_id2 int not null,
		foreign key (unit_id2) references tbl_unit (id),
	ratio decimal(10,2) not null
);

create table tbl_sales (
	id int auto_increment,
	date_recorded datetime not null default current_timestamp,
	manager_id int not null,
	primary key (id),
	foreign key (manager_id) references tbl_manager (id)
);

create table tbl_order (
	id int auto_increment,
	employee_id int not null,
	sales_id int not null,
	primary key (id),
	foreign key (employee_id) references tbl_employee (id),
	foreign key (sales_id) references tbl_sales (id)
);

create table tbl_menu_item_category (
	id int auto_increment primary key,
	name varchar(50)
);

create table tbl_menu_item (
	id int auto_increment primary key,
	name varchar(100) not null,
	price decimal(10,2) not null,
	category_id int not null,
		foreign key (category_id) references tbl_menu_item_category (id),
	is_available bool not null
);

create table tbl_inventory_item (
	id int auto_increment primary key,
	name varchar(100) not null,
	quantity int not null default 0,
	cost decimal(10,2) not null,
	unit_id int not null,
		foreign key (unit_id) references tbl_unit (id)
);

create table tbl_menu_item_ingredients (
	menu_item_id int not null,
		foreign key (menu_item_id) references tbl_menu_item (id),
	inventory_item_id int not null,
		foreign key (inventory_item_id) references tbl_inventory_item (id),
	quantity int not null,
	cost decimal(10,2) not null,
	unit_id int not null,
		foreign key (unit_id) references tbl_unit (id)
);

create table tbl_order_item (
	order_id int not null,
		foreign key (order_id) references tbl_order (id),
	menu_item_id int not null,
		foreign key (menu_item_id) references tbl_menu_item (id),
	quantity int not null,
	price decimal(10,2) not null
);

create table tbl_stockout (
	id int auto_increment primary key,
	date_recorded datetime not null default current_timestamp,
	inventory_item_id int not null,
		foreign key (inventory_item_id) references tbl_inventory_item (id),
	remarks varchar(255) not null,
	manager_id int not null,
		foreign key (manager_id) references tbl_manager (id)
);

create table tbl_order_supply (
	id int auto_increment primary key,
	date_recorded datetime not null default current_timestamp,
	manager_id int not null,
		foreign key (manager_id) references tbl_manager (id),
	supplier_name varchar(100) not null
);

create table tbl_order_supply_item (
	order_supply_id int not null,
		foreign key (order_supply_id) references tbl_order_supply (id),
	inventory_item_id int not null,
		foreign key (inventory_item_id) references tbl_inventory_item (id),
	quantity int not null,
	cost decimal(10,2) not null
);




create table tbl_event_name (
	id int auto_increment primary key,
	name varchar(100) not null
);

create table tbl_event (
	id int auto_increment primary key,
	event_name_id int not null,
		foreign key (event_name_id) references tbl_event_name (id),
	tickets_sold int not null,
	ticket_price decimal(10,2) not null,
	sales_id int not null,
		foreign key (sales_id) references tbl_sales (id)
);

create table tbl_guest (
	id int auto_increment primary key,
	name varchar(100) not null
);

create table tbl_event_guests (
	event_id int not null,
		foreign key (event_id) references tbl_event (id),
	guest_id int not null,
		foreign key (guest_id) references tbl_guest (id),
	talent_fee decimal(10,2) not null
);

create table tbl_event_logistics (
	id int auto_increment primary key,
	event_id int not null,
		foreign key (event_id) references tbl_event (id),
	transport_cost decimal(10,2) not null,
	accomodation_cost decimal(10,2) not null,
	other_cost decimal(10,2) not null
);

create table tbl_equipment (
	id int auto_increment primary key,
	name varchar(50) not null
);

create table tbl_event_logistics_equipment (
	event_logistics_id int not null,
		foreign key (event_logistics_id) references tbl_event_logistics (id),
	equip_id int not null,
		foreign key (equip_id) references tbl_equipment (id),
	quantity int not null,
	cost decimal(10,2) not null
);