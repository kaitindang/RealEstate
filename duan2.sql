
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
    phone INT not null,
    avatar VARCHAR(20) DEFAULT 'account.png',
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


CREATE DATABASE IF NOT EXISTS Product_service;
USE Product_service;

CREATE TABLE IF NOT EXISTS ProductCategories (
    id_productcate INT PRIMARY KEY AUTO_INCREMENT,
    name_productcate VARCHAR(20),
    detail_productcate VARCHAR(100),
    person_modified int,
    date_create datetime default now(),
    date_modified datetime default now(),
    enable_productcate BOOLEAN DEFAULT TRUE
);


CREATE TABLE IF NOT EXISTS Product (
    id_product INT PRIMARY KEY AUTO_INCREMENT,
    name_product VARCHAR(20) NOT NULL,
    detail_product VARCHAR(300),
    image_product VARCHAR(20) DEFAULT 'product.png',
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
    CONSTRAINT FK_CateProduct FOREIGN KEY (id_productcate)
        REFERENCES ProductCategories (id_productcate)
);

create table ProductDetails (
id_productdetails int primary key auto_increment,
id_product int,
size int,
width int,
height int,
position_x float,
position_y float,
person_modified int,
date_modified datetime default now(),
 CONSTRAINT FK_DetailProduct FOREIGN KEY (id_product)
        REFERENCES Product (id_product)
);

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