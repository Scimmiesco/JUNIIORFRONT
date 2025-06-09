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
        {{ titulo() ?? 'Detalhe do produto' }}
      </h2>
    </div>
  `,
  styles: `
    `,
})
export class ProductCartComponent {
  titulo = input();
  private readonly _router = inject(Router);

  backToBegin() {
    this._router.navigate(['../']);
  }
}
