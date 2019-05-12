import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl + '/users/auth';

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(this.apiUrl + '/login', user);
  }

  register(user: User) {
    return this.http.post(this.apiUrl + '/register', user);
  }
}
