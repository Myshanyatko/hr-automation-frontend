import { Filter } from 'src/app/models/filterEvents';
import { getCities } from './../../store/actions/restaurants.actions';
import { selectCities } from './../../store/selectors/restaurants.selectors';
import { ShortEvent } from './../../models/shortEvent';
import { filter, map } from 'rxjs/operators';
import { getEvents } from './../../store/actions/events.actions';
import { AppState } from 'src/app/store/state/app.state';
import {
  selectAllEvents,
  selectPages,
} from './../../store/selectors/events.selectors';

import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  filterForm!: FormGroup;
  events$ = this.store$.select(selectAllEvents);
  myDate = new Date();
  pasteEvents$: Observable<ShortEvent[] | undefined> | null = null;
  uncomingEvents$: Observable<ShortEvent[] | null> | null = null;
  activeItemIndex = 0;
  pages$ = this.store$.select(selectPages);
  index = 0;
  cities$ = this.store$.select(selectCities);
  filter: Filter = {
    name: null,
    fromDate: null,
    toDate: null,
    format: null,
    cityId: null,
  };
  dateItems = [
    { name: 'Все', value: { fromDate: null, toDate: null } },
    { name: 'Предстоящие', value: { fromDate: new Date(), toDate: null } },
    { name: 'Прошедшие', value: { fromDate: null, toDate: new Date() } },
    {
      name: 'За последний месяц',
      value: {
        fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        toDate: new Date(),
      },
    },
    {
      name: 'За последние 3 месяца',
      value: {
        fromDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
        toDate: new Date(),
      },
    },
    {
      name: 'За последний год',
      value: {
        fromDate: new Date(
          new Date().setFullYear(new Date().getFullYear() - 1)
        ),
        toDate: new Date(),
      },
    },
  ];
  formatItems = [
    { name: 'Онлайн и офлайн', value: 'COMBINED' },
    { name: 'Офлайн', value: 'OFFLINE' },
    { name: 'Онлайн', value: 'ONLINE' },
    { name: 'Все', value: null },
  ];
  name = new FormControl();

  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  ngOnInit(): void {
    console.log();
    this.store$.dispatch(
      getEvents({ pageNumber: this.index, filter: this.filter })
    );

    this.filterForm = this.fb.group({
      city: [],
      date: [this.dateItems[0]],
      format: [this.formatItems[3]],
    });
    this.store$.dispatch(getCities());

    this.filterForm.valueChanges.subscribe((value) => {
      if (value.city)
        this.filter = { ...this.filter, cityId: Number(value.city.id) };
      else this.filter = { ...this.filter, cityId: null };
      if (value.date != this.dateItems[0])
        this.filter = {
          ...this.filter,
          fromDate: value.date.value.fromDate,
          toDate: value.date.value.toDate,
        };
      else
        this.filter = {
          ...this.filter,
          fromDate: null,
          toDate: null,
        };
      if (value.format != this.formatItems[3])
        this.filter = {
          ...this.filter,
          format: value.format.value,
        };
      else
        this.filter = {
          ...this.filter,
          format: null,
        };

      this.store$.dispatch(
        getEvents({
          pageNumber: 0,
          filter: this.filter,
        })
      );
    });
  }
  isPast(date: Date) {
    return !(date > new Date());
  }

  search() {
    this.filter = {
      ...this.filter,
      name: this.name.value,
    };
    this.store$.dispatch(
      getEvents({
        pageNumber: 0,
        filter: this.filter,
      })
    );
  }
  goToPage(index: number) {
    this.store$.dispatch(getEvents({ pageNumber: index, filter: this.filter }));
  }
}
