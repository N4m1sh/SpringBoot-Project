CREATE TABLE `t_orders`
(
    `id`    bigint(20) NOT NULL AUTO_INCREMENT,
    `Order_number` varchar(255) DEFAULT Null,
    `sku_code` varchar(255),
    `price` decimal(19,2),
    `quantity`  int(11),
    PRIMARY KEY (`id`)
);