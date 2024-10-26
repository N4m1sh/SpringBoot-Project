CREATE TABLE `t_inventory`
(
    `id`    bigint NOT NULL AUTO_INCREMENT,
    `sku_code`  varchar(225) DEFAULT NULL,
    `quantity`  int DEFAULT NULL,
    PRIMARY KEY (`id`)
);
