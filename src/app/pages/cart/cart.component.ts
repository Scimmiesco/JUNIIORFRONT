import { Component, inject } from '@angular/core';
import { ProductCartComponent } from '../../shared/components/back-header.component';
import { CartStateService } from '../../shared/cart-state.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/IProduct.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [ProductCartComponent, NgOptimizedImage, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartStateService = inject(CartStateService);
  private readonly _router = inject(Router);

  removeItemCart(id: number, event: Event) {
    event.stopPropagation();
    this.cartStateService.removeItem(id);
  }

  addItemCart(product: Product, event: Event) {
    event.stopPropagation();
    this.cartStateService.addProduct(product);
  }

  detailItem(product: Product) {
    this._router.navigate([`product/${product.id}`], {
      state: { product: product },
    });
  }
}
