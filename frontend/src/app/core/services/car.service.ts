import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs'
import { ICar } from '../interfaces';
import {environment} from '../../../environments/environment'

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  loadCarsList(): Observable<ICar[]> {
    return this.http.get<ICar[]>(`${apiUrl}/cars`)
  }

  loadCarById(id: string): Observable<ICar> {
    return this.http.get<ICar>(`${apiUrl}/cars/${id}`)
  }
}
