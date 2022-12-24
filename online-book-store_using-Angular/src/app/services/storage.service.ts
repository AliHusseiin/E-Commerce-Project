import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  heart: number = 0;

  constructor() {}
  getLikesNumber() {
    this.heart++;
    return localStorage.setItem('likes', JSON.stringify(this.heart));
  }
  getTotalLikes() {
    return localStorage.getItem('likes') || 0;
  }
}
