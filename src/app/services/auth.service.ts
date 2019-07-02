import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + '/users/auth';

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(this.apiUrl + '/login', user).pipe(map(token => this.setToken(token)));
  }

  register(user: User) {
    return this.http.post(this.apiUrl + '/register', user);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  isUserLoggedIn() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

}
