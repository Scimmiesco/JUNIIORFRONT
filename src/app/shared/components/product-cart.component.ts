import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
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
    z-index: 99;
    box-shadow: $box-shadow-lg;
    span {
      font-size: 1.5rem;
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

  product = input.required<Product>();

  public readonly isInCart = computed(() =>
    this._cartService.items().some((item) => item.id === this.product().id)
  );

  addToCart(event: any): void {
    event.stopPropagation();
    this._cartService.addProduct(this.product());
  }
}
