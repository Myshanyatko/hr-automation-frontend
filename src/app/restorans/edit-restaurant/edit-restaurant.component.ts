import { getStatuses } from './../../store/actions/restaurants.actions';
import { selectStatuses } from './../../store/selectors/restaurants.selectors';
import { map } from 'rxjs/operators';
import { selectRestaurant } from 'src/app/store/selectors/restaurants.selectors';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/state/app.state';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css'],
})
export class EditRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  restaurant$ = this.store$.select(selectRestaurant);
  statuses$ = this.store$.select(selectStatuses)
  errors = false
  loading = false
  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(getStatuses())
    this.restaurantForm = this.fb.group({
      name: [],
      address: [],
      status: [],
    });
    this.restaurant$.subscribe((rest) => {
      if (rest != null) {
        this.restaurantForm.controls['name'].setValue(rest.name);
        this.restaurantForm.controls['address'].setValue(rest.address);
        this.restaurantForm.controls['status'].setValue(rest.status);
      }
    });
  }
  saveRestaurant() {}
}
