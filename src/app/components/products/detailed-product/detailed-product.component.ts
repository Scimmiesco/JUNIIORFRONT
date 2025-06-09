import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { CartStateService } from '../../../shared/cart-state.service';
import { Router } from '@angular/router';
import { Product } from '../../../models/IProduct.interface';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-detailedProduct',
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './detailed-product.component.html',
  styleUrl: './detailed-product.component.scss',
})
export class DetailedProductComponent {
  private readonly _cartService = inject(CartStateService);
  public readonly router = inject(Router);

  product: InputSignal<Product> = input.required<Product>();

  public readonly isInCart = computed(() =>
    this._cartService.items().some((item) => item.id === this.product()?.id)
  );
}
