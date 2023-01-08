import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../interfaces/product';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    public storageService: StorageService,
    public authService: AuthService
  ) {
    this.cart = storageService.getFromLocalStorage();
  }
  cart: Product[] = [];
  checkOutForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobile_number: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip_code: new FormControl('', [Validators.required]),
  });

  placeOrder() {
    let info = JSON.stringify({
      subTotal: this.getSubTotal(),
      shipping: this.getShipping(),
      total_price: this.getTotal(),
      user_id: this.authService.getId(),
      order_date: new Date(),
      shipping_info: this.checkOutForm.value,
    });
    if (this.checkOutForm.valid) {
      console.log(this.checkOutForm.valid);
      this.authService.postInfo(info).subscribe((data: any) => {
        console.log(data);
      });
    }
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
