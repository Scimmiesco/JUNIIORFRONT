import { Component, inject } from '@angular/core';
import { ProductCartComponent } from '../../shared/components/back-header.component';
import { CartStateService } from '../../shared/cart-state.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [ProductCartComponent, NgOptimizedImage],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartStateService = inject(CartStateService);
}
