import { MapMarker } from '@angular/google-maps';
import {
  selectStatuses,
  selectCurrentCity,
} from './../../store/selectors/restaurants.selectors';
import {
  createRestaurant,
  createRestaurantSuccess,
  createRestaurantViaCoords,
  getStatuses,
} from './../../store/actions/restaurants.actions';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { apiKey } from 'apiKey';
import { Observable, Subject } from 'rxjs';

let nextProcessId = 1;
interface marker {
  lat: number;
  lng: number;
}
@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css'],
})
export class CreateRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  errors = false;
  loading = false;
  open = false;
  link =
    'https://maps.googleapis.com/maps/api/js?key=' +
    apiKey +
    '&callback=initMap&v=weekly';
  city$ = this.store$.select(selectCurrentCity);
  statuses$ = this.store$.select(selectStatuses);
  marker$: Observable<marker> | null = null;
  marker?: marker;
  addressIsDisabled = false;
  readonly control = new FormControl();
  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private store$: Store<AppState>
  ) {
    this.city$.subscribe(
      (city) => (this.marker = { lat: city.lat, lng: city.lng })
    );
  }

  ngOnInit(): void {
    this.store$.dispatch(getStatuses());

    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    this.statuses$.subscribe((statuses) => {
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
      let currentCity = 1;
      this.store$
        .select(selectCurrentCity)
        .subscribe((city) => (currentCity = city.id));
      const processId = nextProcessId + 1;
      if (!this.addressIsDisabled) {

        this.store$.dispatch(
          createRestaurant({
            restaurant: {
              name: this.restaurantForm.value.name,
              statusId: this.restaurantForm.value.status.id,
              address: this.restaurantForm.value.address,
              cityId: currentCity,
            },
            processId: processId,
          })
        );
      } else if (this.marker != null) {
        console.log('2' + this.addressIsDisabled);
        this.store$.dispatch(
          createRestaurantViaCoords({
            restaurant: {
              name: this.restaurantForm.value.name,
              statusId: this.restaurantForm.value.status.id,
              lat: this.marker?.lat,
              lng: this.marker?.lng,
              cityId: currentCity,
            },
            processId: processId,
          })
        );
      }
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
  showDialog() {
    this.open = true;
  }
  markerDragEnd($event: google.maps.MapMouseEvent) {
    if ($event.latLng == null) return null;
    else return this.marker = { lat: $event.latLng?.lat(), lng: $event.latLng.lng() };
  }
  saveCoords() {
    this.open = false;
    this.restaurantForm.controls['address'].setValue(
      `Введены координаты (${this.marker?.lat}, ${this.marker?.lng})`
    );
    this.addressIsDisabled = true;
  }
  changeAdddressIsDisabled() {
    this.addressIsDisabled = false;
    this.restaurantForm.controls['address'].setValue('');
  }
}
