import { ActivatedRoute } from '@angular/router';
import { getEvent } from './../../store/actions/events.actions';
import { selectEvent } from './../../store/selectors/events.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  event$ = this.store$.select(selectEvent);
  constructor(private route: ActivatedRoute, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params
      .subscribe((params) =>
        this.store$.dispatch(getEvent({ id: params['id'] }))
      )
      .unsubscribe();
  }
}
