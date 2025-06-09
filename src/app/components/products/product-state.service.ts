import { Injectable, inject, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Product } from '../../models/IProduct.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductStateService {
  private productHttp = inject(ProductService);
  private platformId = inject(PLATFORM_ID);

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  hasMore = signal<boolean>(true);

  private pageNumber = 1;
  private readonly pageSize = 16;

  private readonly PRODUCTS_CACHE_KEY = 'products_cache';
  private readonly HAS_MORE_CACHE_KEY = 'has_more_cache';

  constructor() {
    this.loadInitialDataFromCache();
  }

  loadMore(): void {
    if (this.isLoading() || !this.hasMore()) {
      return;
    }

    this.isLoading.set(true);
    const offset = this.pageNumber * this.pageSize;

    this.productHttp
      .getAllpaginated({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      })
      .pipe(
        tap((newProducts) => {
          this.hasMore.set(newProducts.hasNextPage);

          this.products.update((currentProducts) => [
            ...currentProducts,
            ...newProducts.data,
          ]);

          this.pageNumber++;
          this.updateCache();
        }),
        catchError((err) => {
          this.hasMore.set(false);
          this.updateCache();
          return EMPTY;
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe();
  }

  private loadInitialDataFromCache(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const cachedProducts = sessionStorage.getItem(this.PRODUCTS_CACHE_KEY);
        const cachedHasMore = sessionStorage.getItem(this.HAS_MORE_CACHE_KEY);

        if (cachedProducts) {
          const products = JSON.parse(cachedProducts);
          this.products.set(products);
          this.pageNumber = Math.ceil(products.length / this.pageSize);
        }

        if (cachedHasMore !== null && cachedHasMore !== undefined) {
          this.hasMore.set(JSON.parse(cachedHasMore));
        }
      } catch (error) {
        this.clearCache();
      }
    }
  }

  private updateCache(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        sessionStorage.setItem(
          this.PRODUCTS_CACHE_KEY,
          JSON.stringify(this.products())
        );
        sessionStorage.setItem(
          this.HAS_MORE_CACHE_KEY,
          JSON.stringify(this.hasMore())
        );
      } catch (error) {}
    }
  }

  private clearCache(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.PRODUCTS_CACHE_KEY);
      sessionStorage.removeItem(this.HAS_MORE_CACHE_KEY);
    }
  }
}
