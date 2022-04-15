import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.css']
})
export class PostCarComponent {

  fileImage: any

  postCarForm: FormGroup = this.formBuilder.group({
    make: new FormControl("Make", [Validators.required]),
    model: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    year: new FormControl(null, [Validators.required]),
    fuel: new FormControl("Fuel", [Validators.required]),
    color: new FormControl(null, [Validators.required]),
    power: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required, Validators.minLength(10)])
  })

  constructor(private formBuilder: FormBuilder, private carService: CarService, private router: Router) { }

  uploadImage(event: any) {
    const file = event.target.files[0];

    this.carService.imgUpload(file).subscribe({
      next: (img) => {
        this.fileImage = img
      },
      error: (e) => console.error(e)
    })

  }

  submitCar() {


    const { make, model, image, price, year, fuel, color, power, description } = this.postCarForm.value;

    const body = {
      make: make,
      model: model,
      image: this.fileImage,
      price: price,
      year: year,
      fuel: fuel,
      color: color,
      power: power,
      description: description
    }
    
    this.carService.createCar(body).subscribe({
      next: () => { this.router.navigate(['/mycars']) },
      error: (e) => console.log(e)
    })
  }

}
