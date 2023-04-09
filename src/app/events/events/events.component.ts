import { ShortEvent } from './../../models/shortEvent';
import { filter, map } from 'rxjs/operators';
import { getEvents } from './../../store/actions/events.actions';
import { AppState } from 'src/app/store/state/app.state';
import { selectAllEvents } from './../../store/selectors/events.selectors';

import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  eventForm!: FormGroup;
  filterForm!: FormGroup;
  events$ = this.store$.select(selectAllEvents);
  myDate = new Date();
  pasteEvents$: Observable<ShortEvent[]> | null = null;
  uncomingEvents$: Observable<ShortEvent[] | undefined> | null = null;
  activeItemIndex = 0;
  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: [localStorage.getItem('eventsFilter'), []],
    });
    this.store$.dispatch(getEvents({ pageNumber: 0 }));
    this.filterForm = this.fb.group({
      filters: [],
    });
  }
  search() {}
  onToggledItemChange(event$: string) {
    if (event$ == 'предстоящие') {
      this.filterForm.controls['filters'].setValue(['предстоящие']);

      this.uncomingEvents$ = this.events$.pipe(
        map((events) => events?.filter((event) => event.date > new Date()))
      );
      this.uncomingEvents$.subscribe((events) => console.log(events));
    }
    else  {
      this.filterForm.controls['filters'].setValue(['прошедшие']);
    
  }
  console.log(this.filterForm.value);
  
}}
