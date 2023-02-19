import { Actions, ofType } from '@ngrx/effects';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { tap, takeUntil, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import {
  deleteRestaurant,
  deleteRestaurantSuccess,
  deleteReview,
  getRestaurant,
} from './../../store/actions/restaurants.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/state/app.state';
import { Component, OnInit } from '@angular/core';
import { selectRestaurant } from 'src/app/store/selectors/restaurants.selectors';

let nextProcessId = 1;
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers: [TuiDestroyService],
})
export class RestaurantComponent implements OnInit {
  restaurant$ = this.store$.select(selectRestaurant);
  constructor(
    private actions$: Actions,
    private destroy$: TuiDestroyService,
    private store$: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(({ id }) =>
          this.store$.dispatch(getRestaurant({ id: Number(id) }))
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  deleteRest(id: number) {
    const processId = nextProcessId + 1;
    this.store$.dispatch(deleteRestaurant({ id: id, processId: processId }));
    this.actions$
      .pipe(
        ofType(deleteRestaurantSuccess),
        filter((action) => action.processId === processId)
      )
      .subscribe(() => {
        this.router.navigate(['/restaurants']);
      });
  }
  deleteReview(id: number) {
    this.store$.dispatch(deleteReview({ id: id }));
  }
}
