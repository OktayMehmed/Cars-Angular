import { Component, OnInit } from '@angular/core';
import { ICar } from 'src/app/core/interfaces';
import { cars } from 'src/cars';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  cars: ICar[] = cars

  constructor() { }

  ngOnInit(): void {
  }

}
