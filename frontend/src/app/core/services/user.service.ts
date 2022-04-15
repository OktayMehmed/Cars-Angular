import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: any = JSON.parse(localStorage.getItem('userInfo')!);

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(private httpClient: HttpClient) { }

  login(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient.post<IUser>(`/api/users/login`, userData)
      .pipe(
        tap(user => localStorage.setItem('userInfo', JSON.stringify(user))),
        tap(user => this.currentUser = user)
      )
  }

  register(userData: { name: string, email: string, password: string }): Observable<IUser> {
    return this.httpClient.post<IUser>(`/api/users`, userData)
      .pipe(
        tap(user => localStorage.setItem('userInfo', JSON.stringify(user))),
        tap(user => this.currentUser = user)
      )
  }

  logout() {
    localStorage.removeItem('userInfo')
    this.currentUser = undefined;
  }

  getProfile(): Observable<IUser> {

    const token = this.currentUser.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.get<IUser>(`/api/users/profile`, { headers: headers })
  }

  updateProfile(userData: { name: string, email: string, password: string }): Observable<IUser> {
    const token = this.currentUser.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.put<IUser>(`/api/users/profile`, userData, { headers: headers })
      .pipe(
        tap(user => this.currentUser = user)
      )
  }
}
