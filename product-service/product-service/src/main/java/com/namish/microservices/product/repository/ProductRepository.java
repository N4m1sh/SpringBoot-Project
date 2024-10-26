package com.namish.microservices.product.repository;

import com.namish.microservices.product.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product,String> {
    Product findBySkuCode(String skuCode);
}
