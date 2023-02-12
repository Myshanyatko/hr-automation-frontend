import {
  selectStatuses,
  selectCurrentCity,
} from './../../store/selectors/restaurants.selectors';
import { Restaurant } from './../../models/restaurant';
import {
  createRestaurant,
  createRestaurantSuccess,
  getStatuses,
} from './../../store/actions/restaurants.actions';
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
let nextProcessId = 1;
@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css'],
})
export class CreateRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  errors = false;
  loading = false;
  statuses$ = this.store$.select(selectStatuses);
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
    this.store$.dispatch(getStatuses());
    this.store$.dispatch(getProductsCategories());

    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    this.statuses$.subscribe((statuses) => {
      console.log(statuses[0]);

      this.restaurantForm.controls['status'].setValue(statuses[0]);
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
      let currentCity = 2;
      this.store$
        .select(selectCurrentCity)
        .subscribe((city) => (currentCity = city.id));
        const processId = nextProcessId + 1;
      this.mapsAPILoader.load().then(() => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { address: this.restaurantForm.value.address },
          (res) => {
            this.store$.dispatch(
              createRestaurant({
                restaurant: {
                  id: -1,
                  name: this.restaurantForm.value.name,
                  rating: 0,
                  status: this.restaurantForm.value.status.id,
                  average: 0,
                  address: this.restaurantForm.value.address,
                  lat: res[0].geometry.location.lat(),
                  lng: res[0].geometry.location.lng(),
                  city: currentCity,
                  reviews: [],
                },
                processId: processId,
              })
            );
          }
        );
      });
      this.actions$
        .pipe(
          ofType(createRestaurantSuccess),
          filter((action) => action.processId === processId)
        )
        .subscribe(() => {
          this.router.navigate(['/restaurants']);
        });
    }
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
