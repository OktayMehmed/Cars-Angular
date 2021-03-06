import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../core/guards/auth.guard'
import { CarDetailComponent } from './car-detail/car-detail.component'
import { EditCarComponent } from './edit-car/edit-car.component'
import { MyCarsComponent } from './my-cars/my-cars.component'
import { PostCarComponent } from './post-car/post-car.component'

const routes: Routes = [
  {
    path: 'car/:id',
    component: CarDetailComponent
  },

  {
    path: 'mycars',
    canActivate: [AuthGuard],
    component: MyCarsComponent
  },

  {
    path: 'post-car',
    canActivate: [AuthGuard],
    component: PostCarComponent
  },

  {
    path: 'edit-car/:id',
    canActivate: [AuthGuard],
    component: EditCarComponent
  }
]

export const PagesRoutingModule = RouterModule.forChild(routes)