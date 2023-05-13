import { TuiDay, TuiTime, TuiDestroyService } from '@taiga-ui/cdk';
import { selectEvent } from './../../store/selectors/events.selectors';
import { getEvent } from './../../store/actions/events.actions';
import { getCities } from './../../store/actions/restaurants.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { Actions, ofType } from '@ngrx/effects';
import {
  switchMap,
  filter,
  map,
  finalize,
  tap,
  takeUntil,
} from 'rxjs/operators';
import { TuiFileLike } from '@taiga-ui/kit';
import { Subject, of, Observable, timer } from 'rxjs';
import {
  selectCities,
  selectCurrentCity,
} from './../../store/selectors/restaurants.selectors';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  editEvent,
  editEventSuccess,
} from 'src/app/store/actions/events.actions';

let nextProcessId = 1;

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
  providers: [TuiDestroyService],
})
export class EditEventComponent implements OnInit {
  event$ = this.store$.select(selectEvent);
  eventForm!: FormGroup;
  onlineForm!: FormGroup;
  cities$ = this.store$.select(selectCities);
  errors = false;
  loading = false;
  creatingLink = false;
  countLinks = 0;
  showErrorLink = false;

  readonly control = new FormControl();
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => (file ? this.makeRequest(file) : of(null)))
  );
  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private destroy$: TuiDestroyService,
    private store$: Store<AppState>,
    private route: ActivatedRoute,
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

    this.store$.dispatch(getCities());

    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', []],
      description: ['', []],
      date: [null, [Validators.required]],
      materials: this.fb.array([]),
      city: [[Validators.required]],
      online: [],
    });

    this.event$
      .pipe(
        map((event) => {
          if (event != null) {
            this.eventForm.controls['name'].setValue(event.name);
            this.eventForm.controls['address'].setValue(event.address);
            this.eventForm.controls['description'].setValue(event.description);
            this.eventForm.controls['date'].setValue([
              new TuiDay(
                new Date(event.date).getFullYear(),
                new Date(event.date).getMonth(),
                new Date(event.date).getDate()
              ),
              new TuiTime(
                new Date(event.date).getHours(),
                new Date(event.date).getMinutes()
              ),
            ]);
            this.eventForm.controls['online'].setValue(event.format);
            this.cities$
              .pipe(
                tap((cities) => {
                  this.eventForm.controls['city'].setValue(
                    cities?.filter((city) => city.name == event.city)[0]
                  );
                }),
                takeUntil(this.destroy$)
              )
              .subscribe();
            if (!event.materials) return;
            console.log(event.materials);
            for (let material of event.materials) {
              const materialForm = this.fb.group({
                url: [material.url, Validators.required],
                description: [material.description, Validators.required],
              });
              this.materials.push(materialForm);
            }
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    console.log(this.materials);
  }

  get materials() {
    return this.eventForm.controls['materials'] as FormArray;
  }
  editEvent() {
    if (
      this.eventForm.get('name')?.invalid ||
      this.eventForm.get('city')?.invalid ||
      this.eventForm.get('date')?.invalid ||
      this.materials.invalid
    ) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;

      const processId = nextProcessId + 1;
      this.event$
        .pipe(
          map((event) => {
            if (event == null) return;
            this.store$.dispatch(
              editEvent({
                event: {
                  id: event.id,
                  date: new Date(
                    this.eventForm.value.date[0].year,
                    this.eventForm.value.date[0].month,
                    this.eventForm.value.date[0].day,
                    this.eventForm.value.date[1].hours,
                    this.eventForm.value.date[1].minutes
                  ),
                  lat: null,
                  lng: null,
                  name: this.eventForm.value.name,
                  format: this.eventForm.value.online,
                  cityId: this.eventForm.value.city.id,
                  address: this.eventForm.value.address,
                  description: this.eventForm.value.description
                    ? this.eventForm.value.description
                    : null,
                  materials: this.eventForm.value.materials
                    ? this.eventForm.value.materials
                    : null,
                  pictureUrl: '',
                  city: event.city,
                },
                processId: processId,
                callback: () => {
                  this.loading = false;
                },
              })
            );
            this.actions$
              .pipe(
                ofType(editEventSuccess),
                filter((action) => action.processId === processId)
              )
              .subscribe(() => {
                this.router.navigate(['events/event/' + event.id]);
              });
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
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

  deleteLink(id: number) {
    this.materials.removeAt(id);
    this.countLinks = -1;
  }

  showInput() {
    if (this.countLinks == 0 || this.materials.valid) {
      const materialForm = this.fb.group({
        url: ['', Validators.required],
        description: ['', Validators.required],
      });
      this.materials.push(materialForm);

      this.countLinks = +1;
    }
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
