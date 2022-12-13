import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser | null = null;

  get isLoggedIn() {
    return this.user !== null;
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    console.log(this.http.post<IUser>(`/api/login`, {email, password}));
    return this.http.post<IUser>(`/api/login`, {email, password});
  }

  register(username: string, email: string, password: string, rePassword: string) {
    return this.http.post<IUser>(`/api/register`, {username, email, password, rePassword});
  }
}
