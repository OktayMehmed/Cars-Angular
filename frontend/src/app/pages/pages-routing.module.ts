import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../core/guards/auth.guard'
import { CarDetailComponent } from './car-detail/car-detail.component'
import { MyCarsComponent } from './my-cars/my-cars.component'

const routes: Routes = [
  {
    path: 'car/:id',
    component: CarDetailComponent
  },
  
  {
    path: 'mycars',
    canActivate: [AuthGuard],
    component: MyCarsComponent
  }
]

export const PagesRoutingModule = RouterModule.forChild(routes)