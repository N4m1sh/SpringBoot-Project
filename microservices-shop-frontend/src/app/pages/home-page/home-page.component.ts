// home-page.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { OidcSecurityService } from "angular-auth-oidc-client";
import { Product } from "../../model/product";
import { ProductService } from "../../services/product/product.service";
import { AsyncPipe, JsonPipe, NgIf, NgFor } from "@angular/common";
import { Router } from "@angular/router";
import { Order } from "../../model/order";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../services/order/order.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    FormsModule,
    NgIf,
    NgFor
  ],
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly productService = inject(ProductService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  isAuthenticated = false;
  products: Array<Product> = [];
  quantityIsNull = false;
  orderSuccess = false;
  orderFailed = false;
  deleteSuccess = false;
  deleteFailed = false;

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        this.loadProducts();
      }
    )
  }

  loadProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  goToCreateProductPage() {
    this.router.navigateByUrl('/add-product');
  }

  goToEditProductPage(skuCode: string) {
    this.router.navigateByUrl(`/edit-product/${skuCode}`);
  }

  orderProduct(product: Product, quantity: string) {
    this.oidcSecurityService.userData$.subscribe(result => {
      const userDetails = {
        email: result.userData.email,
        firstName: result.userData.firstName,
        lastName: result.userData.lastName
      };

      if (!quantity) {
        this.orderFailed = true;
        this.orderSuccess = false;
        this.quantityIsNull = true;
      } else {
        const order: Order = {
          skuCode: product.skuCode,
          price: product.price,
          quantity: Number(quantity),
          userDetails: userDetails
        }

        this.orderService.orderProduct(order).subscribe(() => {
          this.orderSuccess = true;
          this.orderFailed = false;
        }, error => {
          this.orderFailed = true;
          this.orderSuccess = false;
        })
      }
    })
  }

  deleteProduct(skuCode: string) {
    this.productService.deleteProduct(skuCode).subscribe(
      () => {
        this.deleteSuccess = true;
        this.deleteFailed = false;
        this.loadProducts(); // Reload the products after successful deletion
      },
      error => {
        this.deleteFailed = true;
        this.deleteSuccess = false;
      }
    );
  }
}
