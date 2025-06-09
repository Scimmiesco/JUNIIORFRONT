import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/IProduct.interface';
import { BaseHttpService } from '../../core/services/baseHttp.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseHttpService<Product> {
  constructor() {
    super('products');
  }
}
