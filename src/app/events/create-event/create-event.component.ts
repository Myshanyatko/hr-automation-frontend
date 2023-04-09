import { Router } from '@angular/router';
import {
  createEvent,
  createEventSuccess,
} from './../../store/actions/events.actions';
import { Actions, ofType } from '@ngrx/effects';
import { switchMap, map, finalize, filter } from 'rxjs/operators';
import { Subject, Observable, timer, of } from 'rxjs';
import { TuiFileLike } from '@taiga-ui/kit';
import { getCities } from './../../store/actions/restaurants.actions';
import { selectCities } from './../../store/selectors/restaurants.selectors';
import { AppState } from './../../store/state/app.state';
import { Store } from '@ngrx/store';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

let nextProcessId = 1;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit, OnDestroy {
  eventForm!: FormGroup;
  cities$ = this.store$.select(selectCities);
  errors = false;
  loading = false;
  readonly control = new FormControl();
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => (file ? this.makeRequest(file) : of(null)))
  );
  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private store$: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', []],
      description: [''],
      date: [null, [Validators.required]],
      materials: [],
      city: ['', [Validators.required]],
      online: [],
    });
    this.store$.dispatch(getCities());
  }
  saveEvent() {
    if (
      this.eventForm.get('name')?.invalid ||
      this.eventForm.get('city')?.invalid ||
      this.eventForm.get('date')?.invalid
    ) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;
      console.log(this.eventForm.value.date);

      const processId = nextProcessId + 1;
      this.store$.dispatch(
        createEvent({
          event: {
            id: 0,
            date: new Date(
              this.eventForm.value.date[0].year,
              this.eventForm.value.date[0].month,
              this.eventForm.value.date[0].day,
              this.eventForm.value.date[1].hours,
              this.eventForm.value.date[1].minutes
            ),
            name: this.eventForm.value.name,
            online: false,
            cityId: this.eventForm.value.city.id,
            address: this.eventForm.value.address,
            description: this.eventForm.value.description,
            materials: this.eventForm.value.materials
              ? [this.eventForm.value.materials]
              : null,
            pictureUrl: '',
          },
          processId: processId,
        })
      );

      this.actions$
        .pipe(
          ofType(createEventSuccess),
          filter((action) => action.processId === processId)
        )
        .subscribe(() => {
          this.router.navigate(['/events']);
        });
    }
  }
  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }
  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);

    return timer(1000).pipe(
      map(() => file),
      finalize(() => this.loadingFiles$.next(null))
    );
  }
  removeFile(): void {
    this.control.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
