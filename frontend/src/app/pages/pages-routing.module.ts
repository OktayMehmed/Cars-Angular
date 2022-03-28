import { RouterModule, Routes } from '@angular/router'
import { CarDetailComponent } from './car-detail/car-detail.component'

const routes: Routes = [
  {
    path: 'car/:id',
    component: CarDetailComponent
  }
]

export const PagesRoutingModule = RouterModule.forChild(routes)