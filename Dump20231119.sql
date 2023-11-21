-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema e_commerce
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema e_commerce
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `e_commerce`;

CREATE DATABASE IF NOT EXISTS `e_commerce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `e_commerce` ;

-- -----------------------------------------------------
-- Table `e_commerce`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `e_commerce`.`users` ;

CREATE TABLE IF NOT EXISTS `e_commerce`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(20) NOT NULL,
  `lname` VARCHAR(20) NOT NULL,
  `email` VARCHAR(20) NOT NULL,
  `user_password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `e_commerce`.`cart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `e_commerce`.`cart` ;

CREATE TABLE IF NOT EXISTS `e_commerce`.`cart` (
  `cart_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`cart_id`),
  INDEX `fk_cart_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_cart_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `e_commerce`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `e_commerce`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `e_commerce`.`product` ;

CREATE TABLE IF NOT EXISTS `e_commerce`.`product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(50) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  `quantity_available` INT NULL DEFAULT NULL,
  `img` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `e_commerce`.`item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `e_commerce`.`item` ;

CREATE TABLE IF NOT EXISTS `e_commerce`.`item` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `cart_id` INT NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `cart_id` (`cart_id` ASC) VISIBLE,
  INDEX `product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `item_ibfk_1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `e_commerce`.`cart` (`cart_id`),
  CONSTRAINT `item_ibfk_2`
    FOREIGN KEY (`product_id`)
    REFERENCES `e_commerce`.`product` (`product_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;




INSERT INTO product (product_name, price, quantity_available, img) VALUES ('Jeans', 50, 20, 'https://lsco.scene7.com/is/image/lsco/726930130-alt1-pdp-lse?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800');
INSERT INTO product (product_name, price, quantity_available, img) VALUES ('Sleeve Sweater', 34.5, 20, 'https://m.media-amazon.com/images/I/814o4yH+VgL._AC_UY1000_.jpg');
INSERT INTO product (product_name, price, quantity_available, img) VALUES ('Turtlenecks', 24.5, 20, 'https://images.urbndata.com/is/image/Anthropologie/4113086690011_052_b?$a15-pdp-detail-shot$&fit=constrain&qlt=80&wid=640');
INSERT INTO product (product_name, price, quantity_available, img) VALUES ('Boots', 70.5, 2, 'https://cdn.media.amplience.net/i/drmartens/11822006.80?$smart576$&fmt=auto');


INSERT INTO users (fname, lname, email, user_password) VALUES ('admin', 'admin', 'admin@gmail.com', 'admin123');
INSERT INTO users (fname, lname, email, user_password) VALUES ('r', 'r', 'r@gmail.com', 'rr');
INSERT INTO users (fname, lname, email, user_password) VALUES ('d', 'd', 'd@gmail.com', 'dd');

INSERT INTO cart (user_id) VALUES (1);
INSERT INTO cart (user_id) VALUES (2);
INSERT INTO cart (user_id) VALUES (3);

INSERT INTO item (cart_id, product_id, quantity) VALUES (1, 2, 1);
INSERT INTO item (cart_id, product_id, quantity) VALUES (1, 3, 1);
INSERT INTO item (cart_id, product_id, quantity) VALUES (1, 4, 1);
INSERT INTO item (cart_id, product_id, quantity) VALUES (2, 2, 1);



