
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE DATABASE IF NOT EXISTS Account_Service;
USE Account_Service;

CREATE TABLE IF NOT EXISTS Account (
    id_account INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
	first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
	date_of_birth DATETIME DEFAULT now(),
    phone int,
    address VARCHAR(100),
    avatar VARCHAR(20) DEFAULT '/img/user.png',
    create_date datetime DEFAULT now(),
    last_login datetime null,
    enable_account boolean default true
 
);

CREATE TABLE IF NOT EXISTS Roles(
	roles_id int PRIMARY KEY AUTO_INCREMENT,
	rolename VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Account_roles(
    account_id int NOT NULL,
    roles_id int NOT NULL,
	FOREIGN KEY (account_id) REFERENCES Account (id_account) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (roles_id) REFERENCES Roles (roles_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (account_id, roles_id)
);

INSERT INTO ROLES(rolename) VALUE("ROLE_USER");
INSERT INTO ROLES(rolename) VALUE("ROLE_ADMIN");
INSERT INTO ROLES(rolename) VALUE("ROLE_DEALER");

insert into account_service.account (username, password, first_name, last_name, email, phone) value 
("admin", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "admin","admin","admin@gmail.com", 0919114445),
("user", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user","user","user@gmail.com", 0919114445),
("user1", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user1","user1","user1@gmail.com", 0919114445),
("user2", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user2","user2","user2@gmail.com", 0919114445),
("user3", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user3","user3","user3@gmail.com", 0919114445),
("user4", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user4","user4","user4@gmail.com", 0919114445),
("user5", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user5","user5","user5@gmail.com", 0919114445),
("user6", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user6","user6","user6@gmail.com", 0919114445),
("user7", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user7","user7","user7@gmail.com", 0919114445),
("user8", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user8","user8","user8@gmail.com", 0919114445),
("user9", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user9","user9","user9@gmail.com", 0919114445),
("user10", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user10","user10","user10@gmail.com", 0919114445),
("user11", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user11","user11","user11@gmail.com", 0919114445),
("user12", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user12","user12","user12@gmail.com", 0919114445),
("user13", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user13","user13","user13@gmail.com", 0919114445),
("user14", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user14","user14","user14@gmail.com", 0919114445),
("user15", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user15","user15","user15@gmail.com", 0919114445),
("user16", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user16","user16","user16@gmail.com", 0919114445),
("user17", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user17","user17","user17@gmail.com", 0919114445),
("user18", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user18","user18","user18@gmail.com", 0919114445),
("user19", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user19","user19","user19@gmail.com", 0919114445),
("user20", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user20","user20","user20@gmail.com", 0919114445),
("user21", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user21","user21","user21@gmail.com", 0919114445),
("user22", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user22","user22","user22@gmail.com", 0919114445),
("user23", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user23","user23","user23@gmail.com", 0919114445),
("user24", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user24","user24","user24@gmail.com", 0919114445),
("user25", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user25","user25","user25@gmail.com", 0919114445),
("user26", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user26","user26","user26@gmail.com", 0919114445),
("user27", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user27","user27","user27@gmail.com", 0919114445),
("user28", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user28","user28","user28@gmail.com", 0919114445),
("user29", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user29","user29","user29@gmail.com", 0919114445),
("user30", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user30","user30","user30@gmail.com", 0919114445),
("user31", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user31","user31","user31@gmail.com", 0919114445),
("user32", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user32","user32","user32@gmail.com", 0919114445),
("user33", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user33","user33","user33@gmail.com", 0919114445),
("user34", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user34","user34","user34@gmail.com", 0919114445),
("user35", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user35","user35","user35@gmail.com", 0919114445),
("user36", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user36","user36","user36@gmail.com", 0919114445),
("user37", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user37","user37","user37@gmail.com", 0919114445),
("user38", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user38","user38","user38@gmail.com", 0919114445),
("user39", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user39","user39","user39@gmail.com", 0919114445),
("user40", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user40","user40","user40@gmail.com", 0919114445),
("user41", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user41","user41","user41@gmail.com", 0919114445),
("user42", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user42","user42","user42@gmail.com", 0919114445),
("user43", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user43","user43","user43@gmail.com", 0919114445),
("user44", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user44","user44","user44@gmail.com", 0919114445),
("user45", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user45","user45","user45@gmail.com", 0919114445),
("user46", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user46","user46","user46@gmail.com", 0919114445),
("user47", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user47","user47","user47@gmail.com", 0919114445),
("user48", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user48","user48","user48@gmail.com", 0919114445),
("user49", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user49","user49","user49@gmail.com", 0919114445),
("user50", "$2a$10$4yfOx16qoQ9vslreXbIgYO411.OWWfweR9MWronWKI9nbdS7WQZBC", "user50","user50","user50@gmail.com", 0919114445)

INSERT INTO Account_roles(account_id, roles_id) VALUE 
(1,2),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(7,1),
(8,1),
(9,1),
(10,1),
(11,1),
(12,1)


CREATE DATABASE IF NOT EXISTS Listing_service;
USE Listing_service;

CREATE TABLE IF NOT EXISTS Listing (
    id_product INT PRIMARY KEY AUTO_INCREMENT,
    name_product VARCHAR(1000) NOT NULL,
    detail_product VARCHAR(500),
    image_product VARCHAR(500) DEFAULT 'product.png',
    date_create DATETIME DEFAULT NOW(),
    id_productcate INT NOT NULL,
    price DOUBLE NOT NULL,
    person_modified int,
    date_modified datetime default now(),
    enable_product BOOLEAN DEFAULT TRUE,
	address VARCHAR(300),
    area int,
    floor_space int,
    room int,
    owner_project VARCHAR(30),
    id_producttype int,
    date_expired datetime default now(),
    approve boolean default false,
    priority boolean default false,
    priority_type int
    
);

CREATE TABLE IF NOT EXISTS ListingCategories (
    id_productcate INT PRIMARY KEY AUTO_INCREMENT,
    name_productcate VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS ListingType (
    id_producttype INT PRIMARY KEY AUTO_INCREMENT,
    name_producttype VARCHAR(20)
);

ALTER TABLE listing_service.Listing ADD CONSTRAINT FK_CateListing FOREIGN KEY (id_productcate)
REFERENCES listing_service.ListingCategories (id_productcate);

ALTER TABLE listing_service.Listing ADD CONSTRAINT FK_TypeListing FOREIGN KEY (id_producttype)
REFERENCES listing_service.ListingType (id_producttype);

INSERT INTO ListingCategories(name_productcate) VALUE ("Căn hộ chung cư");
INSERT INTO ListingCategories(name_productcate) VALUE ("nhà ở");
INSERT INTO ListingCategories(name_productcate) VALUE ("Đất");
INSERT INTO ListingCategories(name_productcate) VALUE ("Văn phòng");
INSERT INTO ListingCategories(name_productcate) VALUE ("Nhà xưởng");

INSERT INTO ListingType(name_producttype) VALUE ("Mua bán");
INSERT INTO ListingType(name_producttype) VALUE ("cho thuê");

INSERT INTO Listing(name_product, detail_product, id_productcate, id_producttype, price, address, area, floor_space, room, owner_project, approve, priority, priority_type) 
VALUE ("Bán Gấp Nhà phố Vạn kiếp tặng nội thất 35m 5 tầng", "Vị trí nhà 5 tầng ngõ rất rộng xe máy tránh nhau thoải mái, ngõ nông nghiệp cách phố Vạn Kiếp 30m.
", 2, 1, 10000,  "Ngõ 42 Phố Vạn Kiếp, Phường Bạch Đằng, Quận Hai Bà Trưng, Hà Nội", 35, 5, 3, "Vinhomes", 1, 1, 1);
INSERT INTO Listing(name_product, detail_product, id_productcate, id_producttype, price, address, area, floor_space, room, owner_project, approve, priority, priority_type) 
VALUE ("Cho thuê căn hộ Bcons Garden 2PN giá", "LH: Xem nhà ở ngay", 1, 2, 1000,  "Bcons Garden, 25, Đường Phạm Hữu Lầu, Phường Dĩ An, Dĩ An, Bình Dương", 50, 2, 3, "Bcons Garden", 1, 1, 3);


CREATE DATABASE IF NOT EXISTS Blog_service;
use Blog_service;

create table if not exists Author(
id_author int primary key auto_increment,
name_author varchar(20) not null,
date_of_birth datetime,
person_modified int,
date_modified datetime default now(),
enable_author boolean default true

);

CREATE TABLE IF NOT EXISTS BlogCategories (
    id_blogcate INT PRIMARY KEY AUTO_INCREMENT,
    name_blogcate VARCHAR(20),
    detail_blogcate VARCHAR(100),
    person_modified INT,
    date_modified DATETIME DEFAULT NOW(),
    status_blogcate BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Blog (
    id_blog INT PRIMARY KEY AUTO_INCREMENT,
    name_blog VARCHAR(20) NOT NULL,
    id_blogcate INT NOT NULL,
    content_blog VARCHAR(300),
    date_create DATETIME DEFAULT NOW(),
    person_modified INT,
    date_modified DATETIME DEFAULT NOW(),
    status_blog BOOLEAN DEFAULT TRUE,
    CONSTRAINT FK_CateBlog FOREIGN KEY (id_blogcate)
        REFERENCES BlogCategories (id_blogcate)
       
);

CREATE DATABASE IF NOT EXISTS Payment_service;
use Payment_service;

CREATE TABLE IF NOT EXISTS Payment (
    id_payment INT PRIMARY KEY AUTO_INCREMENT,
    name_payment VARCHAR(20),
    id_account INT NOT NULL,
    content_payment VARCHAR(300),
	amount DOUBLE,
    person_modified INT,
    date_modified DATETIME DEFAULT NOW()

       
);

CREATE TABLE IF NOT EXISTS PaymentHistory (
    id_paymenthistory INT PRIMARY KEY AUTO_INCREMENT,
    id_payment INT NOT NULL,
	pre_amount DOUBLE,
	pay_money DOUBLE,
	aft_amount DOUBLE,	
    person_modified INT,
    date_modified DATETIME DEFAULT NOW(),
	CONSTRAINT FK_PayHis FOREIGN KEY (id_payment)
        REFERENCES Payment (id_payment)
       
);

CREATE DATABASE IF NOT EXISTS finance_service,
USE finance_service

CREATE TABLE Bank (
	id_bank INT PRIMARY KEY AUTO_INCREMENT,
    bank_name VARCHAR(100),
    bank_rate FLOAT,
    maximum_term int,
    maximum_rate int
);

INSERT INTO Bank (bank_name, bank_rate, maximum_term, maximum_rate) value 
("BIDV", 7.8, 100, 30), 
("Agribank", 8, 100, 5),
("Vietinbank", 8.2, 80, 20),
("Vietcombank", 9.5, 70, 20),
("MSB", 4.99, 90, 35),
("Shinhan Bank", 7.99, 70, 30),
("TPBank", 8, 90, 30),
("HDBank", 8.2, 85, 25),
("VIB", 8.5, 90, 30),
("Eximbank", 8.5, 70, 20),
("SeABank", 9.29, 90, 25),
("Sacombank", 9.5, 100, 30),
("Standard Chartered", 10, 75, 25),
("OCB", 10.5, 100, 30),
("Techcombank", 10.5, 70, 35),
("MBBank", 10.5, 80, 20),
("SHB", 10.8, 75, 25),
("ABBank", 	11.2, 90, 35),
("HSBC", 11.5, 70, 25),
("VPBank", 11.8, 75, 25)

