import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MyCarsComponent } from './my-cars/my-cars.component';
import { PostCarComponent } from './post-car/post-car.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CarsComponent,
    HomePageComponent,
    CarDetailComponent,
    MyCarsComponent,
    PostCarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
