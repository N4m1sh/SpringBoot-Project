// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:9000/api/product';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(this.apiUrl);
  }

  getProductBySkuCode(skuCode: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${skuCode}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/${product.skuCode}`, product);
  }

  deleteProduct(skuCode: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${skuCode}`);
  }
}
