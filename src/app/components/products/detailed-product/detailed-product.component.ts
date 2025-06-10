import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { CartStateService } from '../../../shared/cart-state.service';
import { Router } from '@angular/router';
import { Product } from '../../../models/IProduct.interface';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductCartComponent } from '../../../shared/components/product-cart.component';
import { ProductService } from '../product.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ProductStateService } from '../product-state.service';

@Component({
  selector: 'app-detailedProduct',
  imports: [NgOptimizedImage, CommonModule, ProductCartComponent],
  templateUrl: './detailed-product.component.html',
  styleUrl: './detailed-product.component.scss',
})
export class DetailedProductComponent {
  private readonly _cartService = inject(CartStateService);
  private readonly _productService = inject(ProductService);
  private readonly _productStateService = inject(ProductStateService);
  private readonly _notificationService = inject(NotificationService);
  public readonly _router = inject(Router);

  product: InputSignal<Product> = input.required<Product>();

  public readonly isInCart = computed(() =>
    this._cartService.items().some((item) => item.id === this.product()?.id)
  );

  deleteProduct() {
    this._productService.delete(this.product().id).subscribe((res) => {
      this._productStateService.products.update((currentProducts) =>
        currentProducts.filter((item) => item.id !== this.product().id)
      );

      this._productStateService.updateCache();
      this._notificationService.show(
        'Produto excluído com sucesso!',
        'success'
      );
      this._router.navigate(['../']);
    });
  }
}
