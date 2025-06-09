import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-header',
  imports: [CommonModule],
  template: `
    <div class="back_header">
      <button class="button_back" (click)="backToBegin()">
        <span class="material-symbols-outlined"> arrow_back_ios_new </span>
      </button>
      <h2>
        {{ title() ?? 'Detalhe do produto' }}
      </h2>
    </div>
  `,
  styles: `
    `,
})
export class ProductCartComponent {
  title = input();
  private readonly _router = inject(Router);

  backToBegin() {
    this._router.navigate(['../']);
  }
}
