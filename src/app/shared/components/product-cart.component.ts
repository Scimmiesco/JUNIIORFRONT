import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common'; // Importe para usar [class.inCart] e outras diretivas
import { Product } from '../../models/IProduct.interface';
import { CartStateService } from '../cart-state.service';

@Component({
  selector: 'app-product-cart-button',
  imports: [CommonModule],
  host: { '[class.inCart]': 'isInCart()' },
  template: `
    <button
      type="button"
      aria-label="Adicionar ao carrinho"
      (click)="addToCart($event)"
    >
      <span class="material-symbols-outlined">
        {{ isInCart() ? 'shopping_cart' : 'add_shopping_cart' }}
      </span>
    </button>
  `,
  styles: `
  @use "styles/main" as *;

  :host {
    position: absolute;
    background-color: var(--bg-secondary);
    border-radius: 0 0 0 1rem;
    padding: 0.5rem;
    right: 0;
    box-shadow: $box-shadow-lg;
    span {
      font-size: 1rem;
    }

    &:active {
      background-color: var(--accent);
    }

    &.inCart {
      background-color: var(--accent);
    }
    
  }
    `,
})
export class ProductCartComponent {
  private readonly _cartService = inject(CartStateService);

  productId = input.required<number>();

  public readonly isInCart = computed(() =>
    this._cartService.items().some((item) => item.id === this.productId())
  );

  addToCart(event: any): void {
    event.stopPropagation();
    const product: Partial<Product> = { id: this.productId() };
    if (product.id) this._cartService.addProduct(product.id);
  }
}
