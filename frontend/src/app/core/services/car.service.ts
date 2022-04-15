import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ICar } from '../interfaces';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient, private userService: UserService) { }

  loadCarsList(): Observable<ICar[]> {
    return this.http.get<ICar[]>(`api/cars`)
  }

  loadCarById(id: string): Observable<ICar> {
    return this.http.get<ICar>(`api/cars/${id}`)
  }

  loadUserCars(): Observable<ICar[]> {
    const token = this.userService.currentUser.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<ICar[]>(`api/cars/mycars`, { headers: headers })
  }


  createCar(car: {
    make: string,
    model: string,
    image: string,
    price: number,
    year: number,
    fuel: string,
    color: string,
    power: number,
    description: string
  }): Observable<ICar> {
    const token = this.userService.currentUser.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<ICar>(`api/cars`, car, { headers: headers })
  }

  deleteCar(id: string): Observable<ICar> {
    const token = this.userService.currentUser.token;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.delete<ICar>(`api/cars/${id}`, { headers: headers })
  }

  updateCar(car: {
    _id: string,
    make: string,
    model: string,
    image: string,
    price: number,
    year: number,
    fuel: string,
    color: string,
    power: number,
    description: string
  }, id: string): Observable<ICar> {
    const token = this.userService.currentUser.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.put<ICar>(`api/cars/${id}`, car, { headers: headers })
  }

  imgUpload(fileToUpload: any) {

    const formData = new FormData();
    formData.append("image", fileToUpload);

    return this.http.post(`api/upload`, formData)
  }
}
