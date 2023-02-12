import { Restaurant } from './../../models/restaurant';
import { createRestaurant } from './../../store/actions/restaurants.actions';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, Observable } from 'rxjs';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { selectProductsCategories } from 'src/app/store/selectors/products.selectors';
import {
  addNewProduct,
  addNewProductSuccess,
  getProductsCategories,
} from 'src/app/store/actions/products.actions';
import { Product } from 'src/app/models/product';
import { MapsAPILoader } from '@agm/core';
var nextProcessId = 0;
@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css'],
})
export class CreateRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  errors = false;
  loading = false;
  status = [{name: 'ресторан', id: 0}, {name: 'столовая', id: 1}];
  readonly control = new FormControl();
  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private http: HttpClient,
    private mapsAPILoader: MapsAPILoader,
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
      this.mapsAPILoader.load().then(() => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { address: this.restaurantForm.value.address },
          (res) => {
            this.store$.dispatch(
              createRestaurant({
                restaurant: {
                  id: -1,
                  name: this.restaurantForm.value.name, //название рестика
                  rating: 0, //звезды
                  status: this.restaurantForm.value.status.id, //id статусa (ресторан, кафе...)
                  average: 0, //средний чек
                  address: 'this.restaurantForm.value.address', //адрес рестика ('Ленина 1')
                  lat: res[0].geometry.location.lat() ,
                  lng: res[0].geometry.location.lng(), //координаты в гугл мапе{lat: 5.456564, lng: 5.353354}
                  city: 2,
                  reviews: [],
                },
                processId: 0,
              })
            );
          }
        );
      });

      //   const restaurant : Restaurant = {
      //     id: -1,
      //     name: this.restaurantForm.value.name, //название рестика
      //     rating: 0, //звезды
      //     status: this.restaurantForm.value.status, //id статусa (ресторан, кафе...)
      //     check: 0, //средний чек
      //     address: this.restaurantForm.value.address, //адрес рестика ('Ленина 1')
      //     lat:  this.restaurantForm.value.address,
      //     lng: number, //координаты в гугл мапе{lat: 5.456564, lng: 5.353354}
      //     city: string,
      //     reviews: Review[]  //отзывы
      // }
    }
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
