import { City } from './../models/city';
import {
  selectCities,
  selectCurrentCity,
} from './../store/selectors/restaurants.selectors';
import { Store } from '@ngrx/store';
import {
  getRestaurants,
  getCities,
  setCurrentCity,
  deleteCity,
} from './../store/actions/restaurants.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Restaurant } from './../models/restaurant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../store/state/app.state';
import { selectAllRestaurants } from '../store/selectors/restaurants.selectors';

@Component({
  selector: 'app-restorans',
  templateUrl: './restorans.component.html',
  styleUrls: ['./restorans.component.css'],
})
export class RestoransComponent implements OnInit, OnDestroy {
  restForm!: FormGroup;
  filterForm!: FormGroup;
  cities$ = this.store$.select(selectCities);
  currentCity$ = this.store$.select(selectCurrentCity);
  restaurants$ = this.store$.select(selectAllRestaurants);
  markers = [
    { lat: 56.465152202424484, lng: 84.95378432534983 },
    { lat: 56.464413315407455, lng: 84.95530196728016 },
    { lat: 56.456114865250285, lng: 84.95185844214778 },
  ];
  open = false;
  public aa = Math.round(4);
  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.open = false;
    this.restForm = this.fb.group({
      name: [sessionStorage.getItem('usersFilter'), []],
    });
    this.filterForm = this.fb.group({
      filters: [],
    });
    this.currentCity$.subscribe((city) =>
      this.store$.dispatch(getRestaurants({ cityId: city.id }))
    );
  }
  showDialog() {
    this.store$.dispatch(getCities());
    this.open = true;
  }
  changeCity(city: City) {
    this.open = false;
    this.store$.dispatch(setCurrentCity({ city: city }));
  }
  deleteCity(id: number) {
    this.store$.dispatch(deleteCity({ id: id }));
  }
  ngOnDestroy() {
    this.open = false;
  }
  search() {}
}
