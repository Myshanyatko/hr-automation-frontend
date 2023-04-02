import {
  getUpcomingEvents,
  getPastEvents,
} from './../../store/actions/events.actions';
import { AppState } from 'src/app/store/state/app.state';
import {
  selectUpcomingEvents,
  selectPastEvents,
} from './../../store/selectors/events.selectors';

import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  eventForm!: FormGroup;
  filterForm!: FormGroup;
  events$ = this.store$.select(selectUpcomingEvents);
  activeItemIndex = 0
  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: [localStorage.getItem('eventsFilter'), []],
    });
    this.store$.dispatch(getUpcomingEvents({ pageNumber: 0 }));
    this.events$.subscribe(event => console.log(event))
    
  }
  search() {}

  switchEventsClick(isUpcoming: boolean) {
    if (isUpcoming) {
      this.store$.dispatch(getUpcomingEvents({ pageNumber: 0 }));
      this.events$ = this.store$.select(selectUpcomingEvents);
    } else {
      this.store$.dispatch(getPastEvents({ pageNumber: 0 }));
      this.events$ = this.store$.select(selectPastEvents);
    }
  }
}
