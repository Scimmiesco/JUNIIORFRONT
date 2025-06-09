import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/IProduct.interface';
import { CommonModule } from '@angular/common';
import { DetailedProductComponent } from '../../components/products/detailed-product/detailed-product.component';
import { ProductService } from '../../components/products/product.service';
import { ProductCartComponent } from '../../shared/components/back-header.component';

@Component({
  selector: 'app-produto',
  imports: [CommonModule, DetailedProductComponent, ProductCartComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent {
  private readonly router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  product: WritableSignal<Product | undefined> = signal(undefined);

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.product.set(navigation?.extras?.state?.['product']);
  }

  ngOnInit(): void {
    if (!this.product()) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.productService.getById(id).subscribe((res) => {
          if (res) {
            this.product.set(res.data);
          }
        });
      }
    }
  }
}
