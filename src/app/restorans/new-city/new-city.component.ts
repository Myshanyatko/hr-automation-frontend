import {
  createCity,
  createCitySuccess,
} from './../../store/actions/restaurants.actions';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
let nextProcessId = 1;
@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.css'],
})
export class NewCityComponent implements OnInit {
  cityForm!: FormGroup;
  errors = false;
  loading = false;

  constructor(
    private actions$: Actions,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    debugger;
    this.cityForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  saveCity() {
    if (this.cityForm.get('name')?.invalid) {
      this.errors = true;
    } else {
      if (this.loading == false) this.loading = true;
      const processId = nextProcessId + 1;
      this.mapsAPILoader.load().then(() => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: this.cityForm.value.name }, (res) => {
          this.store$.dispatch(
            createCity({
              city: {
                id: -1,
                name: this.cityForm.value.name,
                lat: res[0].geometry.location.lat(),
                lng: res[0].geometry.location.lng(),
              },
              processId: processId,
            })
          );
        });
      });
      this.actions$
        .pipe(
          ofType(createCitySuccess),
          filter((action) => action.processId === processId)
        )
        .subscribe(() => {
          this.router.navigate(['/restaurants']);
        });
    }
  }
  ngOnDestroy(): void {
    this.loading = false;
  }
}
