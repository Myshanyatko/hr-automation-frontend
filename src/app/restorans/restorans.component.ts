import { Store } from '@ngrx/store';
import { getRestaurants } from './../store/actions/restaurants.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Restaurant } from './../models/restaurant';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/state/app.state';
import { selectAllRestaurants } from '../store/selectors/restaurants.selectors';
// <reference path="./style-reference.d.ts" />

@Component({
  selector: 'app-restorans',
  templateUrl: './restorans.component.html',
  styleUrls: ['./restorans.component.css'],
})
export class RestoransComponent implements OnInit {
  restForm!: FormGroup;
  filterForm!: FormGroup;
  statuses1 = ['рестораны', 'кафе', 'столовая'];
  statuses2 = ['до 500р.', 'до 1000р.', 'до 1500р.'];
  restaurants$ = this.store$.select(selectAllRestaurants);
  // restaurants: Restaurant[] = [
  //   {
  //     id: 0,
  //     name: 'пешком постою',
  //     rating: 3,
  //     statusId: 1,
  //     check: 400,
  //     address: 'усова, 14а',
  //     lat: 56.464413315407455, lng: 84.95530196728016 ,
  //     reviews: [],
  //   },
  //   {
  //     id: 1,
  //     name: 'еки токи',
  //     rating: 10,
  //     statusId: 1,
  //     check: 400,
  //     address: 'усова, 78',
  //      lat: 56.464413315407455, lng: 84.95530196728016 ,
  //     reviews: [],
  //   },
  // ];
  // markers = [
  //   { lat: 56.465152202424484, lng: 84.95378432534983 },
  //   { lat: 56.464413315407455, lng: 84.95530196728016 },
  //   { lat: 56.456114865250285, lng: 84.95185844214778 },
  // ];
  open = false;

  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.restForm = this.fb.group({
      name: [sessionStorage.getItem('usersFilter'), []],
    });
    this.filterForm = this.fb.group({
      filters: [],
    });
    this.store$.dispatch(getRestaurants());
  }
  showDialog(): void {
    this.open = true;
  }
  search() {}
}
