// edit-product.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Product } from "../../model/product";
import { ProductService } from "../../services/product/product.service";
import { NgIf } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  productUpdated = false;
  skuCode: string;

  constructor(private fb: FormBuilder) {
    this.editProductForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required]]
    });
    this.skuCode = '';
  }

  ngOnInit(): void {
    this.skuCode = this.route.snapshot.paramMap.get('skuCode') || '';
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProductBySkuCode(this.skuCode).subscribe(
      product => {
        this.editProductForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price
        });
      },
      error => {
        console.error('Error loading product', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editProductForm.valid) {
      const updatedProduct: Product = {
        skuCode: this.skuCode,
        name: this.editProductForm.get('name')?.value,
        description: this.editProductForm.get('description')?.value,
        price: this.editProductForm.get('price')?.value
      };

      this.productService.updateProduct(updatedProduct).subscribe(
        () => {
          this.productUpdated = true;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error => {
          console.error('Error updating product', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  get name() {
    return this.editProductForm.get('name');
  }

  get description() {
    return this.editProductForm.get('description');
  }

  get price() {
    return this.editProductForm.get('price');
  }
}
