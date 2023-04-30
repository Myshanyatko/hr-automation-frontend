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
import {
  selectCities,
  selectCurrentCity,
} from './../../store/selectors/restaurants.selectors';
import { AppState } from './../../store/state/app.state';
import { Store } from '@ngrx/store';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

let nextProcessId = 1;

interface marker {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit, OnDestroy {
  eventForm!: FormGroup;
  onlineForm!: FormGroup;
  cities$ = this.store$.select(selectCities);
  errors = false;
  loading = false;
  open = false;
  addressIsDisabled = false;
  marker?: marker;
  city$ = this.store$.select(selectCurrentCity);
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
    private store$: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', []],
      description: ['', []],
      date: [null, [Validators.required]],
      materials: this.fb.array([]),
      city: [[Validators.required]],
      online: ['ONLINE'],
    });
    this.city$.subscribe((city) => {
      this.marker = { lat: city.lat, lng: city.lng };
      this.eventForm.get('city')?.setValue(city);
    });
    this.onlineForm = this.fb.group({
      online: ['', [Validators.required]],
    });

    this.store$.dispatch(getCities());
  }
  get materials() {
    return this.eventForm.controls['materials'] as FormArray;
  }
  saveEvent() {
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
            lat:
              this.marker?.lat && this.addressIsDisabled
                ? this.marker?.lat
                : null,
            lng:
              this.marker?.lng && this.addressIsDisabled
                ? this.marker?.lng
                : null,
            name: this.eventForm.value.name,
            format: this.eventForm.value.online,
            cityId: this.eventForm.value.city.id,
            address:
              !this.addressIsDisabled && this.eventForm.value.address
                ? this.eventForm.value.address
                : null,
            description: this.eventForm.value.description
              ? this.eventForm.value.description
              : null,
            materials: this.eventForm.value.materials
              ? this.eventForm.value.materials
              : null,
            pictureUrl: '',
            city: null,
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
  showDialog() {
    this.open = true;
  }
  saveCoords() {
    this.open = false;
    this.eventForm.controls['address'].setValue(
      `Введены координаты (${this.marker?.lat}, ${this.marker?.lng})`
    );
    this.addressIsDisabled = true;
  }
  markerDragEnd($event: google.maps.MapMouseEvent) {
    if ($event.latLng == null) return null;
    else
      return (this.marker = {
        lat: $event.latLng?.lat(),
        lng: $event.latLng.lng(),
      });
  }
  changeAddressIsDisabled() {
    this.addressIsDisabled = false;
    this.eventForm.controls['address'].setValue('');
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
