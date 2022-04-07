import { Component, OnInit } from '@angular/core';
import { ICar } from 'src/app/core/interfaces';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.css']
})
export class MyCarsComponent implements OnInit {
  cars: ICar[] = [];
  loader: boolean = true

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.loadUserCars().subscribe(carsList => {
      this.cars = carsList;
      this.loader = false;
    })
  }

}
