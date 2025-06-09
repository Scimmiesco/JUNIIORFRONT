import { Component, inject, OnInit } from '@angular/core';
import { ProductsListComponent } from '../../components/products/products-list/products-list.component';
import { ProductService } from '../../components/products/product.service';
import { ProdutoComponent } from '../produto/produto.component';

@Component({
  selector: 'app-home',
  imports: [ProductsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly _productService = inject(ProductService);

  ngOnInit(): void {}
}
