import { Product } from './IProduct.interface';

export interface CartItem extends CartProduct {
  id: number;
  quantity: number;
  totalPrice?: number;
}

export interface CartProduct extends Partial<Product> {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
}
