import { Component, Input } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  product: Product[] = [
    {
      id: 1,
      name: 'Grokking Algorithms',
      price: 100,
      img: '/assets/imgs/Grokking Algo 1.jpg',
      index: 0,
      quantity: 0,
    },
    {
      id: 2,
      name: 'Master interview',
      price: 100,
      img: '/assets/imgs/interview.jpg',
      index: 1,
      quantity: 0,
    },
    {
      id: 3,
      name: 'Data science',
      price: 100,
      img: '/assets/imgs/data.jpg',
      index: 2,
      quantity: 0,
    },
    {
      id: 4,
      name: 'design patterns',
      price: 100,
      img: '/assets/imgs/design patterns.jpg',
      index: 3,
      quantity: 0,
    },
    {
      id: 5,
      name: 'cloud',
      price: 100,
      img: '/assets/imgs/cloud.jpg',
      index: 4,
      quantity: 0,
    },
    {
      id: 6,
      name: 'machine learning',
      price: 100,
      img: '/assets/imgs/machine.jpg',
      index: 5,
      quantity: 0,
    },
    {
      id: 7,
      name: 'php',
      price: 100,
      img: '/assets/imgs/php.jpg',
      index: 6,
      quantity: 0,
    },
    {
      id: 8,
      name: 'problem solving',
      price: 100,
      img: '/assets/imgs/ps.jpg',
      index: 7,
      quantity: 0,
    },
  ];
  products: Product[] = [];
  setCart() {
    this.storageService.setCartNumber();
  }

  getLikeNumber() {
    this.storageService.getLikesNumber();
  }
  getFromLocalStorage() {
    return localStorage.getItem('products') || '[]';
  }
  addToCart(index: number, quantity: number) {
    if (this.product[index].quantity > 0) {
      this.product[index].quantity++;
      return (
        localStorage.setItem('products', JSON.stringify(this.products)),
        localStorage.getItem('products') || '[]'
      );
    } else {
      this.product[index].quantity++;
      this.products.push(this.product[index]);

      return (
        localStorage.setItem('products', JSON.stringify(this.products)),
        localStorage.getItem('products') || '[]'
      );
    }
  }

  constructor(private storageService: StorageService) {}
}
