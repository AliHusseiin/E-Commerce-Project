import { Component, Input, Output } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Product } from '../interfaces/product';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  // @Output() products: Product[] = [];
  @Output() products: Product[] = [];
  constructor(private storageService: StorageService) {}

  incQuantity(i: number) {
    this.products[i].quantity += 1;
  }

  decQuantity(i: number) {
    if (this.products[i].quantity > 1) this.products[i].quantity -= 1;
  }

  remove(i: number) {
    this.products.splice(i, 1);
  }

  getTotal(): number {
    return this.getShipping() + this.getSubTotal();
  }
  getSubTotal(): number {
    return this.products
      .map((x) => x.price * x.quantity)
      .reduce((a, v) => (a += v), 0);
  }
  getShipping(): number {
    return (
      this.products.map((x) => x.quantity).reduce((a, v) => (a += v), 0) * 2
    );
  }
}
