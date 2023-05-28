import { TuiDestroyService } from '@taiga-ui/cdk';
import { filter, tap, takeUntil, map } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import {
  deleteEvent,
  deleteEventSuccess,
  getEvent,
  setEvent,
} from './../../store/actions/events.actions';
import { selectEvent } from './../../store/selectors/events.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';

let nextProcessId = 1;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [TuiDestroyService],
})
export class EventComponent implements OnInit {
  openMap = false;
  event$ = this.store$.select(selectEvent);
  loading = true;

  constructor(
    private actions$: Actions,
    private destroy$: TuiDestroyService,
    private route: ActivatedRoute,
    private store$: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(({ id }) => {
          this.store$.dispatch(getEvent({ id: Number(id) }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.actions$
      .pipe(
        ofType(setEvent),
        map(() => (this.loading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  showMap() {
    this.openMap = true;
  }
  deleteEvent() {
    const processId = nextProcessId + 1;
    this.route.params
      .subscribe((params) =>
        this.store$.dispatch(
          deleteEvent({ id: params['id'], processId: processId })
        )
      )
      .unsubscribe();

    this.actions$
      .pipe(
        ofType(deleteEventSuccess),
        filter((action) => action.processId === processId)
      )
      .subscribe(() => {
        this.router.navigate(['/events']);
      });
  }
}
