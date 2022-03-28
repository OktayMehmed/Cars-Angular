import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICar } from 'src/app/core/interfaces';
import { cars } from 'src/cars';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: any

  constructor(private activatedRoute: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.car = cars.find((c) => c._id == id);

  }

}
