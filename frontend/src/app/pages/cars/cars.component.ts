import { Component, Input, OnInit } from '@angular/core';
import { ICar } from 'src/app/core/interfaces';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  @Input() car!: ICar;

  constructor() { }

  ngOnInit(): void {
    
  }

}
