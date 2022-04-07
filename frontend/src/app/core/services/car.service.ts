import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ICar } from '../interfaces';
import { environment } from '../../../environments/environment'
import { UserService } from './user.service';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient, private userService: UserService) { }

  loadCarsList(): Observable<ICar[]> {
    return this.http.get<ICar[]>(`${apiUrl}/cars`)
  }

  loadCarById(id: string): Observable<ICar> {
    return this.http.get<ICar>(`${apiUrl}/cars/${id}`)
  }

  loadUserCars(): Observable<ICar[]> {
    const token = this.userService.currentUser.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<ICar[]>(`${apiUrl}/cars/mycars`, { headers: headers })
  }
}
