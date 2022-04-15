import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar } from 'src/app/core/interfaces';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  car!: ICar
  error: string = ""
  loader: boolean = true

  editCarForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private http: HttpClient) {

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.carService.loadCarById(id).subscribe({
      next: (car) => {
        this.car = car
        this.loader = false
        this.editCarForm = this.formBuilder.group({
          make: new FormControl(this.car.make, [Validators.required]),
          model: new FormControl(this.car.model, [Validators.required]),
          image: new FormControl(null, [Validators.required]),
          price: new FormControl(this.car.price, [Validators.required]),
          year: new FormControl(this.car.year, [Validators.required]),
          fuel: new FormControl(this.car.fuel, [Validators.required]),
          color: new FormControl(this.car.color, [Validators.required]),
          power: new FormControl(this.car.power, [Validators.required]),
          description: new FormControl(this.car.description, [Validators.required, Validators.minLength(10)])
        })
      },
      error: (e) => {
        this.error = e.error.message
        this.loader = false
      }
    })
  }

  uploadImage(event: any) {
    const file = event.target.files[0];

    this.carService.imgUpload(file).subscribe({
      next: (img) => this.editCarForm.value.image = img,
      error: (e) => console.error(e)
    })  

  }

  submitEdit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.carService.updateCar(this.editCarForm.value, id).subscribe({
      next: () => this.router.navigate(['mycars']),
      error: (e) => console.error(e)
    })
  }

}
