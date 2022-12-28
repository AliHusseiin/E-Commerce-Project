import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    public storageService: StorageService,
    public authService: AuthService
  ) {}
  signOut() {
    this.authService.signOut();
  }
}
