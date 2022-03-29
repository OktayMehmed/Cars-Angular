import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICar } from 'src/app/core/interfaces';
import { CarService } from 'src/app/core/services/car.service';
import { cars } from 'src/cars';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car!: ICar
  error: string = ""
  loader: boolean = true

  constructor(private activatedRoute: ActivatedRoute, private carService: CarService) {

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.carService.loadCarById(id).subscribe({
      next: (car) => {
        this.car = car
        this.loader = false
      },
      error: (e) => {
        this.error = e.error.message
        this.loader = false
      }
    })
  }

}
