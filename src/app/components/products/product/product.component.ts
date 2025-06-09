import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { Product } from '../../../models/IProduct.interface';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CartStateService } from '../../../shared/cart-state.service';
import { Router } from '@angular/router';
import { ProductCartComponent } from "../../../shared/components/product-cart.component";

@Component({
  selector: 'app-product',
  imports: [CommonModule, NgOptimizedImage, ProductCartComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private readonly _cartService = inject(CartStateService);
  public readonly router = inject(Router);

  product: InputSignal<Product> = input.required<Product>();

  openProductDetail() {
    this.router.navigate([`product/${this.product()?.id}`], {
      state: { product: this.product() },
    });
  }
}
