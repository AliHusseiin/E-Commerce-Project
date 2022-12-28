import { Component, Input, Output } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  // @Output() products: Product[] = [];
  @Input() products: Product[] = [];
  cart: Product[] = [];
  constructor(private storageService: StorageService) {
    this.cart = this.storageService.getFromLocalStorage();
  }

  incQuantity(i: number) {
    this.cart[i].quantity += 1;
  }

  decQuantity(i: number) {
    if (this.cart[i].quantity > 1) this.cart[i].quantity -= 1;
  }

  remove(i: number) {
    this.cart.splice(i, 1);
  }

  getTotal(): number {
    return this.getShipping() + this.getSubTotal();
  }
  getSubTotal(): number {
    return this.cart
      .map((x) => x.price * x.quantity)
      .reduce((a, v) => (a += v), 0);
  }
  getShipping(): number {
    return this.cart.map((x) => x.quantity).reduce((a, v) => (a += v), 0) * 2;
  }
}
