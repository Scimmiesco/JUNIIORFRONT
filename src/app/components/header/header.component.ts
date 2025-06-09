import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, Inject, Signal } from '@angular/core';
import { CartStateService } from '../../shared/cart-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly _cartStateService = inject(CartStateService);
  private readonly _router = inject(Router);

  isDarkTheme = false;
  countItensCart: Signal<number> = this._cartStateService.totalItems;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }

  openCart() {
    this._router.navigate(['cart']);
  }
}
