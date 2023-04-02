import { ShortRest } from './../models/shortRest';
import { Build } from './../models/build';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { City } from './../models/city';
import {
  selectCities,
  selectCurrentCity,
  selectFiltredRestaurants,
} from './../store/selectors/restaurants.selectors';
import { Store } from '@ngrx/store';
import {
  getRestaurants,
  getCities,
  setCurrentCity,
  deleteCity,
  getFiltredRestaurants,
} from './../store/actions/restaurants.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { AppState } from '../store/state/app.state';
import { selectAllRestaurants } from '../store/selectors/restaurants.selectors';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-restorans',
  templateUrl: './restorans.component.html',
  styleUrls: ['./restorans.component.css'],
})
export class RestoransComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  restForm!: FormGroup;
  filterForm!: FormGroup;
  cities$ = this.store$.select(selectCities);
  currentCity$ = this.store$.select(selectCurrentCity);
  builds$: Observable<Build[] | null> | null = null;
  openMap = false;
  openClusterInfo = false;
  filtredRestaurants$: Observable<ShortRest[] | null> | null = null;
  open = false;
  markerClustererImagePath =
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.open = false;
    this.openMap = false;
    this.restForm = this.fb.group({
      name: ['', []],
    });
    this.route.params.subscribe((params) => {
      if (params['search'] != null) {
        this.restForm.controls['name'].setValue(params['search']);
        this.store$.dispatch(
          getFiltredRestaurants({ filter: params['search'] })
        );
        this.filtredRestaurants$ = this.store$.select(selectFiltredRestaurants);
      } else {
        (this.builds$ = this.store$.select(selectAllRestaurants)),
          this.currentCity$.subscribe((city) =>
            this.store$.dispatch(getRestaurants({ cityId: city.id }))
          );
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }
  showDialog() {
    this.store$.dispatch(getCities());
    this.open = true;
  }
  showMap() {
    this.store$.dispatch(getCities());
    this.openMap = true;
  }
  changeCity(city: City) {
    this.open = false;
    this.store$.dispatch(setCurrentCity({ city: city }));
  }
  deleteCity(id: number) {
    this.store$.dispatch(deleteCity({ id: id }));
  }
  ngOnDestroy() {
    this.open = false;
    this.openMap = false;
  }
  search() {
    if (this.restForm.value.name || this.restForm.value.name != '') {
      this.router.navigate([
        '/restaurants',
        { search: this.restForm.value.name },
      ]);
      this.builds$ = null;
    } else {
      this.router.navigate(['/restaurants']), (this.filtredRestaurants$ = null);
    }
  }
  click() {}
  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }
  openInfo(infoWindow: MapInfoWindow) {
    infoWindow.open();
  }
  showAllRestaurants(address: string) {
    localStorage.setItem('restFilter', address);
    this.openMap = false;
    this.ngOnInit();
  }
}
