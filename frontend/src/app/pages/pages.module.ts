import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [
    CarsComponent,
    HomePageComponent,
    CarDetailComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
