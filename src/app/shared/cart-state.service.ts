import {
  Injectable,
  signal,
  computed,
  effect,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductStateService } from '../components/products/product-state.service';
import { CartItem, CartProduct } from '../models/ICart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private platformId = inject(PLATFORM_ID);
  private readonly _productStateService = inject(ProductStateService);

  private readonly CART_KEY = 'shopping_cart';

  private cartItems = signal<CartItem[]>([]);

  public readonly items = this.cartItems.asReadonly();

  public readonly totalItems = computed(() =>
    this.items().reduce((acc, item) => acc + item.quantity, 0)
  );

  public readonly totalPrice = computed(() => {
    const allProducts = this._productStateService.products();
    const cartItems = this.items();

    return cartItems.reduce((acc, cartItem) => {
      const product = allProducts.find((p) => p.id === cartItem.id);

      const price = product ? product.price : 0;

      return acc + price * cartItem.quantity;
    }, 0);
  });

  constructor() {
    this.loadCartFromStorage();

    effect(() => {
      this.saveCartToStorage();
    });
  }

  addProduct(product: CartProduct): void {
    this.cartItems.update((currentItems) => {
      const itemInCart = currentItems.find((item) => item.id === product.id);

      if (itemInCart) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.price * (item.quantity + 1),
              }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...product,
          quantity: 1,
          totalPrice: product.price,
        };
        return [...currentItems, newItem];
      }
    });
  }

  removeItem(productId: number): void {
    this.cartItems.update((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  private saveCartToStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const cartData = JSON.stringify(this.items());
      localStorage.setItem(this.CART_KEY, cartData);
    }
  }

  private loadCartFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem(this.CART_KEY);
      if (savedCart) {
        this.cartItems.set(JSON.parse(savedCart));
      }
    }
  }
}
