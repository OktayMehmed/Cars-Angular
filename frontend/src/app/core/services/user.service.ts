import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: IUser = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : "";

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(private httpClient: HttpClient) { }

  login(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/users/login`, userData, { withCredentials: true })
      .pipe(
        tap(user => localStorage.setItem('userInfo', JSON.stringify(user))),
        tap(user => this.currentUser = user)
      )
  }

  register(userData: { name: string, email: string, password: string }): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/users`, userData, { withCredentials: true })
      .pipe(
        tap(user => localStorage.setItem('userInfo', JSON.stringify(user))),
        tap(user => this.currentUser = user)
      )
  }

  logout(){
    localStorage.removeItem('userInfo')
    this.currentUser = { name: "", email: "", password: "", token: ""}
  }

  getProfile(): Observable<IUser> {

    const token = this.currentUser.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, {headers: headers})
  }

  updateProfile(userData: { name: string, email: string, password: string}): Observable<IUser> {
    const token = this.currentUser.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.put<IUser>(`${environment.apiUrl}/users/profile`, userData, {headers: headers})
    .pipe(
      tap(user => this.currentUser = user)
    )
  }
}
