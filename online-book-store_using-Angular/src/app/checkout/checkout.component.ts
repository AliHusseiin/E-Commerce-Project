import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(private storageService: StorageService) {
    this.cart = storageService.getFromLocalStorage();
  }
  cart: Product[] = [];
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
