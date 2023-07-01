
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


CREATE DATABASE IF NOT EXISTS Listing_service;
USE Listing_service;

CREATE TABLE IF NOT EXISTS Listing (
    id_product INT PRIMARY KEY AUTO_INCREMENT,
    name_product VARCHAR(50) NOT NULL,
    detail_product VARCHAR(500),
    image_product VARCHAR(50) DEFAULT 'product.png',
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