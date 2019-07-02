import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService) { }

  getUserId() {
    if (this.authService.isUserLoggedIn()) {
      return jwt_decode(localStorage.getItem('token'))._id;
    }
  }

  getUserRadius() {
    if (this.authService.isUserLoggedIn()) {
      return jwt_decode(localStorage.getItem('token')).radius;
    }
  }

}
