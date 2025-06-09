import { Component, HostBinding, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStateService } from '../product-state.service';
import { ProductComponent } from '../product/product.component';
import { InfiniteScrollDirective } from '../../../directives/infinite-scroll.directive';
import { LoadingService } from '../../../shared/loading-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, InfiniteScrollDirective],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  public productStateService = inject(ProductStateService);
  public loadingService = inject(LoadingService);
  public router = inject(Router);

  ngOnInit(): void {
    this.productStateService.loadMore();
  }

  isNearBottom() {
    this.productStateService.loadMore();
  }

  createProduct() {
    this.router.navigate([`new-product`]);
  }
}
