import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  heart: number = 0;
  cart: number = 0;

  constructor() {}

  setCartNumber() {
    this.cart++;
    return localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCartNumber() {
    return localStorage.getItem('cart') || 0;
  }
  getLikesNumber() {
    this.heart++;
    return localStorage.setItem('likes', JSON.stringify(this.heart));
  }
  getTotalLikes() {
    return localStorage.getItem('likes') || 0;
  }
  getFromLocalStorage(): Product[] {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }
}
