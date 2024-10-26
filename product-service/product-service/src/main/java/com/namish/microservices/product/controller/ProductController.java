package com.namish.microservices.product.controller;

import com.namish.microservices.product.dto.ProductRequest;
import com.namish.microservices.product.dto.ProductResponse;
import com.namish.microservices.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody ProductRequest productRequest){
        return productService.createProduct(productRequest);
    }
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts(){
//        try{
//            Thread.sleep(5000);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
        return productService.getAllProducts();
    }

    // Fetch a product by SKU code
    @GetMapping("/sku/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ProductResponse> getProductBySkuCode(@PathVariable String skuCode){
        ProductResponse productResponse = productService.getProductBySkuCode(skuCode);
        return productResponse != null
                ? new ResponseEntity<>(productResponse, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //Update method implementation in ProductController
    @PutMapping("/sku/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> updateProductBySkuCode(@PathVariable String skuCode, @RequestBody ProductRequest productRequest) {
        boolean isUpdated = productService.updateProductBySkuCode(skuCode, productRequest);

        return isUpdated
                ? new ResponseEntity<>("Product updated successfully", HttpStatus.OK)
                : new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
    }

    // DELETE method implementation
    @DeleteMapping("/sku/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteProductBySkuCode(@PathVariable String skuCode) {
        boolean isDeleted = productService.deleteProductBySkuCode(skuCode);

        return isDeleted
                ? new ResponseEntity<>("Product deleted successfully", HttpStatus.OK)
                : new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
    }
}
