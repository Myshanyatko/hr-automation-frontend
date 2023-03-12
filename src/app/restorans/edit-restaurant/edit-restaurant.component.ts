import { TuiDestroyService } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { EditedRest } from './../../models/editedRest';
import {
  getStatuses,
  updateRestaurant,
  updateRestaurantSuccess,
} from './../../store/actions/restaurants.actions';
import { selectStatuses } from './../../store/selectors/restaurants.selectors';
import { map, filter, takeUntil } from 'rxjs/operators';
import { selectRestaurant } from 'src/app/store/selectors/restaurants.selectors';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/state/app.state';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

let nextProcessId = 1;
@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css'],
  providers: [TuiDestroyService],
})
export class EditRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;
  restaurant$ = this.store$.select(selectRestaurant);
  statuses$ = this.store$.select(selectStatuses);
  errors = false;
  loading = false;
  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<AppState>,
    private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(getStatuses());
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
  saveRestaurant() {
    if (
      this.restaurantForm.get('name')?.invalid ||
      this.restaurantForm.get('address')?.invalid ||
      this.restaurantForm.get('status')?.invalid
    ) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;
      const processId = nextProcessId + 1;
      
      this.restaurant$.subscribe((rest) => {
        if (rest != null) {
          const restaurant: EditedRest = {
            id: rest?.id,
            name: this.restaurantForm.value.name,
            status: this.restaurantForm.value.status.name,
            address: this.restaurantForm.value.address,
          };
          this.store$.dispatch(
            updateRestaurant({ restaurant: restaurant, processId: processId })
          );
        }
      }).unsubscribe();
      this.actions$
        .pipe(
          ofType(updateRestaurantSuccess),
          filter((action) => action.processId === processId),
          takeUntil(this.destroy$)
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
