package com.namish.microservices.product.service;

import com.namish.microservices.product.dto.ProductRequest;
import com.namish.microservices.product.dto.ProductResponse;
import com.namish.microservices.product.model.Product;
import com.namish.microservices.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository;

    public ProductResponse createProduct(ProductRequest productRequest){
        Product product = Product.builder()
                .name(productRequest.name())
                .description(productRequest.description())
                .skuCode(productRequest.skuCode())
                .price(productRequest.price())
                .build();
        productRepository.save((product));
        log.info("Product created successfully");
        return new ProductResponse(product.getId(),product.getName(),product.getDescription(),product.getSkuCode(),product.getPrice());
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(product -> new ProductResponse(product.getId(),product.getName(),product.getDescription(),product.getSkuCode(),product.getPrice()))
                .toList();
    }

    // Method to retrieve a product by its SKU code
    public ProductResponse getProductBySkuCode(String skuCode) {
        Product product = productRepository.findBySkuCode(skuCode);
        if (product != null) {
            return new ProductResponse(
                    product.getId(),
                    product.getName(),
                    product.getDescription(),
                    product.getSkuCode(),
                    product.getPrice()
            );
        } else {
            return null;  // Handle not found case
        }
    }
    public boolean updateProductBySkuCode(String skuCode, ProductRequest productRequest) {
        Product existingProduct = productRepository.findBySkuCode(skuCode);

        if (existingProduct != null) {
            existingProduct.setName(productRequest.name());
            existingProduct.setDescription(productRequest.description());
            existingProduct.setPrice(productRequest.price());
            productRepository.save(existingProduct);
            log.info("Product updated successfully with SKU Code: {}", skuCode);
            return true;
        }
        return false;
    }

    public boolean deleteProductBySkuCode(String skuCode) {
        Product existingProduct = productRepository.findBySkuCode(skuCode);
        if (existingProduct != null) {
            productRepository.delete(existingProduct);
            log.info("Product deleted successfully with SKU Code: {}", skuCode);
            return true;
        }
        return false;
    }

}
