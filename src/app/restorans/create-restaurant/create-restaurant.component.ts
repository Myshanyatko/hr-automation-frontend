import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { selectProductsCategories } from 'src/app/store/selectors/products.selectors';
import { addNewProduct, addNewProductSuccess, getProductsCategories } from 'src/app/store/actions/products.actions';
import { Product } from 'src/app/models/product';
var nextProcessId = 0
@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  errors = false;
  loading = false;
  status= ['ресторан', 'столовая']

  readonly control = new FormControl();
  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(getProductsCategories());

    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      status: [this.status[0], [Validators.required]],
    });

  
  }

  
  saveRestaurant() {
    if (
      this.restaurantForm.get('name')?.invalid ||
      this.restaurantForm.get('address')?.invalid ||
      this.restaurantForm.get('status')?.invalid 
    ) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;
      console.log('запрос ушел');
      
      this.http.post('http://localhost:8080/restaurants/add', {name:  this.restaurantForm.value.name,
      status:  {id: 0, naame: this.restaurantForm.value.status}, address:  this.restaurantForm.value.address, lat: 5.5, lng: 6.6, city: 'Томск' } ).subscribe(res => console.log(res)
      )

     this.router.navigate(['restaurants'])
    }
  }
  ngOnDestroy(): void {
    this.loading = false;
  }

}
