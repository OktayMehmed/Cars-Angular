import { Component, OnInit } from '@angular/core';
import { ICar } from 'src/app/core/interfaces';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  cars: ICar[] = [];
  loader: boolean = true;

  constructor(private carsService: CarService) { }

  ngOnInit(): void {
    this.carsService.loadCarsList().subscribe(carsList => {
      this.cars = carsList;
      this.loader = false;
    })
  }

}
