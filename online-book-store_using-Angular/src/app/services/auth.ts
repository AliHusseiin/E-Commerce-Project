import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  login(LogInfo: any) {
    return this.httpClient.post(`${environment.apiUrl}users/login`, LogInfo);
  }

  register(data: any) {
    return this.httpClient.post(`${environment.apiUrl}users/register`, data);
  }
  saveLogInfo(LogInfo: any) {
    localStorage.setItem('loginInfo', JSON.stringify(LogInfo));
  }

  getLogInfo() {
    return JSON.parse(localStorage.getItem('loginInfo') || '{}');
  }

  getIsAuthenticated(): boolean {
    return this.getToken() != null;
  }

  getToken() {
    return this.getLogInfo()?.token;
  }

  getName() {
    return `${this.getLogInfo()?.first_name}_${this.getLogInfo()?.last_name}`;
  }

  signOut() {
    localStorage.removeItem('LogInfo');
    this.router.navigate(['/home']);
  }
  getId() {
    return this.getLogInfo()?._id;
  }
  postInfo(data: any) {
    console.log(data);
    return this.httpClient.post(`${environment.apiUrl}orders/`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.getToken(),
      },
    });
  }
}
