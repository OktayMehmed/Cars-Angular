import { Component, OnInit } from '@angular/core';
import { ICars } from '../shared/interfaces';
import {cars} from '../../cars';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: ICars[] = cars

  constructor() { }

  ngOnInit(): void {
    
  }

}
