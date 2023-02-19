import { TuiDestroyService } from '@taiga-ui/cdk';
import { tap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { getRestaurant } from './../../store/actions/restaurants.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/state/app.state';
import { Component, OnInit } from '@angular/core';
import { selectRestaurant } from 'src/app/store/selectors/restaurants.selectors';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers: [TuiDestroyService],
})
export class RestaurantComponent implements OnInit {
  restaurant$ = this.store$.select(selectRestaurant);
  constructor(
    private destroy$: TuiDestroyService,
    private store$: Store<AppState>,
    private route: ActivatedRoute,
   
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(({ id }) => this.store$.dispatch(getRestaurant({id: Number(id)}))),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
